const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// ================= SIGNUP =================

app.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields required"
    });
  }

  return res.status(200).json({
    message: "Signup success"
  });

});

// ================= LOGIN =================

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required"
    });
  }

  return res.status(200).json({
    user: {
      id: 1,
      name: "Jothy",
      email: email
    }
  });

});

// ================= GET TASKS =================

app.get("/tasks/:userId", (req, res) => {

  res.json(tasks);

});

// ================= ADD TASK =================

app.post("/add-task", (req, res) => {

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title required"
    });
  }

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);

});

// ================= UPDATE TASK =================

app.put("/update-task/:id", (req, res) => {

  const id = Number(req.params.id);

  tasks = tasks.map((task) => {

    if (task.id === id) {

      return {
        ...task,
        completed: !task.completed
      };

    }

    return task;

  });

  res.json({
    message: "Task updated"
  });

});

// ================= DELETE TASK =================

app.delete("/delete-task/:id", (req, res) => {

  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({
    message: "Task deleted"
  });

});

// ================= SERVER =================

app.listen(5000, () => {

  console.log("Server running on port 5000");

});