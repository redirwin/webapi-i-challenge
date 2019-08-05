const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.post("/api/users", (req, res) => {
  const body = req.body;

  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
    console.log(result);
  } else {
    Users.insert(body)
      .then(result => {
        res.status(201).json(result);
        console.log(result);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
        console.log(result);
      });
  }
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(result => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

const port = 5000;
server.listen(port, () => console.log(`Server is listening at port ${port}`));
