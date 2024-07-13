const express = require('express');
const router = express.Router();
const { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  assignProject 
} = require('../controller/admin');
const isAuthAdmin = require('../midleware/isAuthAdmin');

router.get('/projects', isAuthAdmin, getAllProjects);
router.post('/projects', isAuthAdmin, createProject);
router.put('/projects/:id', isAuthAdmin, updateProject);
router.delete('/projects/:id', isAuthAdmin, deleteProject);
router.put('/projects/assign/:id', isAuthAdmin, assignProject);

module.exports = router;
