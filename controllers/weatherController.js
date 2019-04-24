const axios = require('axios');

// GET /api/weather/current?latitude={}&longitude={}
exports.getCurrentWeather = (req, res, next) => {
  const unixTime = Number(new Date().getTime() / 1000).toFixed(0);
  axios
    .get(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${req.query.latitude},${
        req.query.longitude
      },${unixTime}`
    )
    .then(result => {
      const { timezone, currently } = result.data;
      const { summary, temperature } = currently;
      const roundedTemp = temperature.toFixed(0);
      res.status(200).json({
        timezone,
        summary,
        temperature: roundedTemp
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};
