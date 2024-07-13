import React, { useState } from 'react';
import { submitProject } from '../service/service';

const AddProject = ({ closeAddPlan }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = { title, description };

    try {
      const response = await submitProject(projectData);
      console.log('Project submitted successfully:', response);
    } catch (error) {
      console.error('Error submitting project:', error);
    }
    closeAddPlan();
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white p-8 rounded-lg z-10" style={{ width: "500px" }}>
          <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Title :</label>
              <input
                className="border border-black ml-2 rounded-sm w-full"
                type="text"
                name="planName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Description :</label>
              <textarea
                className="border border-black ml-2 rounded-sm h-24 w-full"
                name="tasks"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex">
              <button
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                type="submit">
                Add Project
              </button>
              
              <button
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg ml-2"
                type="button"
                onClick={closeAddPlan}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
