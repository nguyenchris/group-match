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
  let newLike;
  db.Post.findOne({ _id: req.body.postId })
    .then(post => {
      fetchedPost = post;
      newLike = new db.Like({
        user: req.userId,
        post: post._id
      });
      return newLike.save();
    })
    .then(like => {
      fetchedPost.likes.push(like);
      return fetchedPost.save();
    })
    .then(result => {
      res.status(201).json(result);
      io.getIO().emit('like', {
        action: 'create',
        post: result,
        like: newLike
      });
    })
    .catch(err => next(err));
};
