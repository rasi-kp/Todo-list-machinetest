const Task = require('../modal/taskSchema');
const Project = require('../modal/projectsSchema');
const User = require('../modal/userSchema');

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find({ teamLeadId: req.user.userId }).populate('projectId', 'title').populate('assignedTo', 'email');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
  },

  createTask: async (req, res) => {
    const { title, description, projectId } = req.body;
    try {
      const task = new Task({ title, description, projectId, teamLeadId: req.user.userId });
      await task.save();
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error creating task', error: err });
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      await task.save();
      res.json({ message: 'Task updated successfully', task });
    } catch (err) {
      res.status(400).json({ message: 'Error updating task', error: err });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error deleting task', error: err });
    }
  },

  assignTaskToMember: async (req, res) => {
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const member = await User.findById(memberId);
      if (!member || member.role !== 'user') {
        return res.status(404).json({ message: 'Member not found or not authorized' });
      }

      task.assignedTo = memberId;
      await task.save();
      res.json({ message: 'Task assigned to Team Member', task });
    } catch (err) {
      res.status(400).json({ message: 'Error assigning task', error: err });
    }
  },

  updateProjectStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      project.status = status;
      await project.save();
      res.json({ message: 'Project status updated successfully', project });
    } catch (err) {
      res.status(400).json({ message: 'Error updating project status', error: err });
    }
  }
};
