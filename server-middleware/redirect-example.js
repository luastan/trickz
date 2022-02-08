import * as url from "url";

const app = require('express')()


app.all('*', (req, res, next) => {
  // console.log(req.url);

  next();
});


module.exports = app;

// export default function (req, res, next) {
//
//   console.log(req.url);
//   const parts = url.parse(req.url, true);
//
//   if ('redir' in parts.query) {
//     res.statusCode = 302;
//     res.setHeader('Location', '/login');
//     res.end()
//   }
//
//   next();
// }
