const express = require('express');
const indexRouter = express.Router();

/**
 * GET /
 */
indexRouter.get('/', (req, res, next) => {
  res.render('index', { title: "FCC: Timestamp Microservice" });
});

module.exports = indexRouter;
