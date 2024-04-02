const usersRouter = require("express").Router();

let tempUsers = [
  {
    id: "1",
    username: "tarantino",
  },
  {
    id: "2",
    username: "spielberg",
  },
  {
    id: "3",
    username: "nolan",
  },
];

usersRouter.get("/", (req, res) => {
  res.json(tempUsers);
});

module.exports = usersRouter;
