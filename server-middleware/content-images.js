import * as path from "path";

const app = require('express')()

const extensionRe = /([^.%]+\.(jpg|jpeg|png|jfif|gif|svg|avi|zip|mp4|webm|rar|7z))$/

app.all('*', (req, res, next) => {
  const pathname = req.baseUrl + req.path;
  if (extensionRe.test(pathname)) {
    res.sendFile(path.join(__dirname, '..', 'content', pathname));
  } else {
    next();
  }
});

module.exports = app;
