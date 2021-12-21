const express = require('express');
const apiRouter = express.Router();

/**
 * GET /api
 *
 * @response current datetime in unix and utc format
 */
apiRouter.get('/', (req, res, next) => {
  const now = new Date();
  res.status(200).json({ unix: now.getTime(), utc: now.toUTCString() });
});

/**
 * GET /api/:date
 *
 * @error invalid datetime responds with "Invalid Date"
 * @response provided datetime in unix and utc format
 */
apiRouter.get('/:date', (req, res, next) => {
  let parsedDate;

  if (isNaN(req.params.date)) {
    parsedDate = new Date(req.params.date);
  } else {
    parsedDate = new Date(parseInt(req.params.date));
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.status(422).json({ error: "Invalid Date" });
  }
  res.status(200).json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

module.exports = apiRouter;
