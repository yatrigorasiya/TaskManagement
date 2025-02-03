import { useState,useEffect } from "react";
import axios from "axios"

export const Dashboard = ()=>{
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');

    useEffect(() => {
       
        fetchTasks();
      }, []);

      const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3004/api/tasks', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setTasks(response.data);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
      };

      const createTask = async () => {
        try {
          const token = localStorage.getItem('token');
          const newTask = { title, description, status };
          await axios.post('http://localhost:3004/api/task', newTask, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchTasks(); 
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };

    
    
      const deleteTask = async (id) => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3004/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchTasks(); 
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };

      const updateTaskStatus = async (id, newStatus) => {
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://localhost:3004/api/tasks/${id}`, { status: newStatus }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchTasks();
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
    
   
    return (
        <>
         <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Create Task</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={createTask}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Tasks</h3>

      <ul className="space-y-4">
        {
        tasks.map((task) => {
            return (<>
           
        <li key={task._id} className="bg-white shadow-md rounded-xl p-4">
            <div className="text-xl font-medium text-gray-800">{task.title}</div>
            <div className="text-gray-600 mb-2">{task.description}</div>
            <div className="text-sm font-semibold text-blue-500 mb-3">Status: {task.status}</div>

            <div className="flex gap-2">
              <button
                onClick={() => updateTaskStatus(task._id, 'In Progress')}
                className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500 transition"
              >
                In Progress
              </button>
              <button
                onClick={() => updateTaskStatus(task._id, 'Completed')}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
              >
                Completed
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
          </>)
         
})}
      </ul>
    </div>
        </>
    )
}