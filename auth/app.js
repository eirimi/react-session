const express = require("express");
const app = express();
const port = 8080;
const parseurl = require("parseurl");
const session = require("express-session");
const cors = require("cors");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }

  // get the url pathname
  var pathname = parseurl(req).pathname;

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  next();
});

app.get("/", (req, res) => {
  if (req.session.name) {
    res.send(
      "Hello " +
        req.session.name +
        `<form method="GET" action="/logout">
    <div><input type="submit" name="logout" value="ログアウト"></div>
  </form>`
    );
  } else {
    res.send(
      "No login " +
        `<form method="POST" action="/login">
    <div><input type="submit" name="login" value="ログイン"></div>
  </form>`
    );
  }
});

app.post("/login", function (req, res, next) {
  req.session.regenerate((err) => {
    req.session.name = "admin";
    res.redirect("/");
  });
});

app.get("/logout", function (req, res, next) {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
