const Task = require("../models/tasks");

exports.createTask = async (req,res) => {
    const { title, description, status } = req.body;
    const task = await Task.create({ user: req.user._id, title, description, status });
    res.status(201).json(task);
}

exports.getTasks = async (req,res) => {
    const filter = { user: req.user._id };
    if(req.query.status) filter.status = req.query.status;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
}

exports.updateTask = async (req,res) => {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found" });
    if(task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
}

exports.deleteTask = async (req,res) => {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found" });
    if(task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    await task.remove();
    res.json({ message: "Task deleted" });
}
