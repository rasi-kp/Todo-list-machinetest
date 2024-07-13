const express = require('express');
const router = express.Router();
const { 
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  assignTaskToMember,
  updateProjectStatus
} = require('../controller/teamleader');
const isAuthTeamLeader = require('../midleware/isAuthTeamLeader');

router.get('/tasks', isAuthTeamLeader, getAllTasks);
router.post('/tasks', isAuthTeamLeader, createTask);
router.put('/tasks/:id', isAuthTeamLeader, updateTask);
router.delete('/tasks/:id', isAuthTeamLeader, deleteTask);
router.put('/tasks/assign/:id', isAuthTeamLeader, assignTaskToMember);
router.put('/projects/status/:id', isAuthTeamLeader, updateProjectStatus);

module.exports = router;
