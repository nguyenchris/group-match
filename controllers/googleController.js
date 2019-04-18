// Route to get Google Key. Although it is being sent via JSON, the key is meant for client side exposure.
// Key is still set for certain restrictions on the google account
exports.getGoogleKey = (req, res, next) => {
  res.status(200).json({
    googleKey: process.env.GOOGLE_KEY
  });
};
