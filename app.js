const express = require("express");

const app = express();
app.use(express.json());

app.use(express.static("public"));

const users = [];
let id = 1;

function findUserIndexById(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) return i;
  }
  return -1;
}
app.get("/api/users", function (_, res) {

  res.send(users);
});

app.get("/api/users/:id", function (req, res) {

  const id = req.params.id;
  const index = findUserIndexById(id);
  if (index > -1) {
    res.send(users[index]);
  }
  else {
    res.status(404).send("User not found");
  }
});

app.post("/api/users", function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  if (userName == "" || userAge == "") {
    res.status(406).send("User data empty");
    return;
  } else if (isNaN(userAge)) {
    res.status(406).send("User age invalid");
    return;
  }
  const user = { name: userName, age: userAge };
  user.id = id++;
  users.push(user);
  res.send(user);
});

app.delete("/api/users/:id", function (req, res) {

  const id = req.params.id;
  const index = findUserIndexById(id);
  if (index > -1) {
    const user = users.splice(index, 1)[0];
    res.send(user);
  }
  else {
    res.status(404).send("User not found");
  }
});

app.put("/api/users", function (req, res) {

  if (!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;

  const index = findUserIndexById(id);
  if (index > -1) {
    const user = users[index];
    user.age = userAge;
    user.name = userName;
    res.send(user);
  }
  else {
    res.status(404).send("User not found");
  }
});

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});