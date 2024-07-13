const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userH = require("../helpers/userH");
const Task = require('../modal/taskSchema');

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userH.findUser(email);
      if (!user) {
        res.status(404).json({ message: "invalid Email Id" });
      } else {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          if (user.role == 'admin') {
            const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET_ADMIN, { expiresIn: '30d' });
            res.status(200).json({ message: "admin loggedIn", token: token, role: "admin" });
          }
          else if (user.role == 'leader') {
            const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET_TEAMLEADER, { expiresIn: '30d' });
            res.status(200).json({ message: "teamleader loggedIn", token: token, role: "Leader" });
          } else {
            const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET_USER, { expiresIn: '30d' });
            res.status(200).json({ message: "user loggedIn", token: token, role: "user" });
          }
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "login error" });
    }
  },
  signUp: async (req, res) => {
    try {
      const datas = req.body;
      const user = await userH.findUser(datas.email);
      if (!user) {
        const insertdata = await userH.insert(datas);
        res.status(200).json({ message: "successfully inserted user data" });
      } else {
        console.log("existing email");
        res.status(400).json({ message: "email Exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
  },
  getAllAssignedTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ memberId: req.user.userId }).populate('projectId', 'title');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching assigned tasks', error: err });
    }
  },

  updateTaskStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // // Check if the task is assigned to the logged-in user
      // if (task.memberId.toString() !== req.user.userId) {
      //   return res.status(403).json({ message: 'Unauthorized: You are not assigned to this task' });
      // }

      task.status = status;
      await task.save();
      res.json({ message: 'Task status updated successfully', task });
    } catch (err) {
      res.status(400).json({ message: 'Error updating task status', error: err });
    }
  }

}