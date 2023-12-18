require("dotenv").config();

const db = require("./db");
const port = process.env.PORT;
const express = require("express");
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await db.selectUsers();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await db.selecUser(req.params.id); 
  res.json(user);
});

app.post("/users", async (req, res) => {
  await db.createUser(req.body);
  res.sendStatus(201);
});

app.patch("/users/:id", async (req, res) => {
  await db.updateUser(req.params.id ,req.body);
  res.sendStatus(200);
});

app.delete("/users/:id", async (req, res) => {
  await db.deleteUser(req.params.id);
  res.sendStatus(204);
});


app.listen(3000, () => {
  console.log("rodando!");
});
