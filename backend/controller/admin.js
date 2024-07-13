const Project = require('../modal/projectsSchema');
const User = require('../modal/userSchema');


module.exports = {

    getAllProjects: async (req, res) => {
        try {
            const projects = await Project.find({}).populate('teamLeadId', 'email');
            res.json(projects);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching projects', error: err });
        }
    },

    createProject: async (req, res) => {
        
        const { title, description } = req.body;
        try {
            const project = new Project({ title, description });
            await project.save();
            res.status(201).json({ message: 'Project created successfully', project });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error creating project', error: err });
        }
    },

    updateProject: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const project = await Project.findByIdAndUpdate(id, { title, description }, { new: true });
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json({ message: 'Project updated successfully', project });
        } catch (err) {
            res.status(400).json({ message: 'Error updating project', error: err });
        }
    },

    deleteProject: async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project.findByIdAndDelete(id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json({ message: 'Project deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: 'Error deleting project', error: err });
        }
    },
    assignProject: async (req, res) => {
        const { id } = req.params;
        const { teamLeadId } = req.body;
        try {
            const project = await Project.findById(id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const teamLead = await User.findById(teamLeadId);
            if (!teamLead || teamLead.role !== 'leader') {
                return res.status(404).json({ message: 'Team Lead not found or not authorized' });
            }

            project.teamLeadId = teamLeadId;
            await project.save();
            res.json({ message: 'Project assigned to Team Lead', project });
        } catch (error) {
            res.status(400).json({ message: 'Error assigning project', error });
        }
    },
}