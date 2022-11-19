require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());

const posts = [
  {
    username: "Abc",
    title: "Post 1",
  },
  {
    username: "Xyz",
    title: "Post 2",
  },
];
// const users = [];
// app.get("/posts", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });

// app.get("/users", (req, res) => {
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = {
//       name: req.body.name,
//       password: hashedPassword,
//     };
//     users.push(user);
//     res.send("User added");
//     res.status(201).send();
//   } catch (error) {
//     res.status(500).send();
//   }
// });
// app.post("/users/login", async (req, res) => {
//   //Authenticate user
//   const user = users.find((user) => (user.name = req.body.name));
//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       //res.send("Success");
//     } else {
//       res.send("Not Allowed");
//     }
//   } catch (error) {
//     res.status(500).send();
//   }

//   //   const username = req.body.username;
//   //   user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
