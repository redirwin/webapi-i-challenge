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
      res.status(500).json({ error: "The users list could not be retrieved." });
      console.log(error);
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(505)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "Deleted!" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.update(id, body)
      .then(result => {
        if (result) {
          res.status(200).json({ message: "Updated!" });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

const port = 5000;
server.listen(port, () => console.log(`Server is listening at port ${port}`));
