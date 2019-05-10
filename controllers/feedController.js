const db = require('../models/index');
const io = require('../socket');

// GET api/feed/post
exports.getPosts = (req, res, next) => {
  // const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  db.Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return db.Post.find().sort({ createdAt: -1 });
    })
    .then(posts => {
      res.status(200).json({
        posts: posts,
        totalItems
      });
    })
    .catch(err => {
      next(err);
    });
};

// POST /api/feed/post
exports.createPost = (req, res, next) => {
  const { creator, content } = req.body;
  const newPost = new db.Post({
    creator,
    content
  });
  newPost
    .save()
    .then(post => {
      return db.Post.findOne({ _id: post._id });
    })
    .then(fetchedPost => {
      res.status(201).json(fetchedPost);
      io.getIO().emit('posts', {
        action: 'create',
        post: fetchedPost
      });
    })
    .catch(err => next(err));
};

// POST api/feed/like
exports.createLike = (req, res, next) => {
  let fetchedPost;
  let createdLike;
  db.Post.findOne({ _id: req.body.postId })
    .then(post => {
      fetchedPost = post;
      const newLike = new db.Like({
        user: req.userId,
        post: post._id
      });
      return newLike.save();
    })
    .then(like => {
      createdLike = like;
      fetchedPost.likes.push(like);
      return fetchedPost.save();
    })
    .then(result => {
      res.status(201).json({ post: result, like: createdLike });
      io.getIO().emit('like', {
        action: 'create',
        post: result,
        like: createdLike
      });
    })
    .catch(err => next(err));
};

// PUT api/feed/like
exports.deleteLike = (req, res, next) => {
  let fetchedLike;
  let updatedPost;
  db.Post.findOne({ _id: req.body.postId })
    .then(fetchedPost => {
      fetchedPost.likes.pull(req.body.likeId);
      return fetchedPost.save();
    })
    .then(post => {
      updatedPost = post;
      return db.Like.findOneAndDelete({ _id: req.body.likeId });
    })
    .then(like => {
      res.status(201).json({ post: updatedPost });
      io.getIO().emit('like', {
        action: 'delete',
        post: updatedPost
      });
    })
    .catch(err => next(err));
};

// POST api/feed/comment
exports.createComment = (req, res, next) => {
  let fetchedPosts;
  let newComment;
  db.Post.findOne({ _id: req.body.postId })
    .then(post => {
      fetchedPosts = post;
      const comment = new db.Comment({
        content: req.body.content,
        creator: req.userId
      });
      return comment.save();
    })
    .then(savedComment => {
      newComment = savedComment;
      fetchedPosts.comments.push(newComment);
      return fetchedPosts.save();
    })
    .then(updatedPost => {
      return db.Post.findOne({ _id: updatedPost._id });
    })
    .then(newPost => {
      res.status(201).json({ post: newPost, comment: newComment });
      io.getIO().emit('comment', {
        action: 'create',
        post: newPost,
        comment: newComment
      });
    })
    .catch(err => next(err));
};

// PUT api/feed/comment
exports.editComment = (req, res, next) => {
  const commentId = req.body.commentId;
  const content = req.body.content;
  let newComment;
  db.Comment.findOne({ _id: commentId })
    .then(comment => {
      comment.content = content;
      return comment.save();
    })
    .then(updatedComment => {
      newComment = updatedComment;
      return db.Post.findOne({ _id: req.body.postId });
    })
    .then(updatedPost => {
      console.log(newComment);
      res.status(201).json({ post: updatedPost }),
        io.getIO().emit('comment', {
          action: 'edit',
          post: updatedPost,
          comment: newComment
        });
    })
    .catch(err => next(err));
};
