const pool = require("../db");

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json({
      length: allTasks.rows.length,
      tasks: allTasks.rows,
    });
  } catch (e) {
    next(e.message);
  }
};

const getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task ID not found" });
    res.json(result.rows);
  } catch (e) {
    next(e.message);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e.message);
    next(e.message);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Task not found" });
    res.status(204).json({ message: "Task eliminated" });
  } catch (e) {
    next(e.message);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (e) {
    next(e.message);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
