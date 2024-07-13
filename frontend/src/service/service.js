import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Replace with your API URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

var token = localStorage.getItem('token');
export const fetchTasks = async () => {
    try {
        const response = await axiosInstance.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTaskStatus = async (taskId, status) => {
    try {
        const response = await axiosInstance.put(`/tasks/${taskId}/status`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Admin
export const fetchTasksAdmin = async () => {
    try {
        const response = await axiosInstance.get('/admin/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const submitProject = async (projectData) => {
    try {
      const response = await axiosInstance.post('/admin/projects', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting project:', error);
      throw error;
    }
  };

// Add more functions for other API calls if needed

