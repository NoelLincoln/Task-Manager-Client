import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import { Player } from "@lottiefiles/react-lottie-player";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";

interface Task {
  _id: string;
  task_name: string;
  task_description: string;
  completed_status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://18.183.120.7:3001/api/v1/tasks');
      setTasks(response.data.tasks);
    } catch (fetch_error) {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!taskName || !taskDescription) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const newTask = {
        task_name: taskName,
        task_description: taskDescription,
        completed_status: false,
      };

      const response = await axios.post('http://18.183.120.7:3001/api/v1/tasks', newTask);
      setTasks([...tasks, response.data.task]);
      setTaskName("");
      setTaskDescription("");
      setError(null);
      toast.success("Task added successfully!");
    } catch (add_task_error) {
      setError("Failed to add task");
    }
  };

  const editTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const saveTask = async (name: string, description: string) => {
    if (!currentTask) return;

    try {
      const updatedTask = {
        ...currentTask,
        task_name: name,
        task_description: description,
      };
      await axios.patch(`http://18.183.120.7:3001/api/v1/tasks/${currentTask._id}`, updatedTask);
      setTasks(
        tasks.map((task) =>
          task._id === currentTask._id ? updatedTask : task,
        ),
      );
      setIsModalOpen(false);
      setCurrentTask(null);
      toast.success("Task updated successfully!");
    } catch (update_task_error) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://18.183.120.7:3001/api/v1/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (delete_task_error) {
      setError("Failed to delete task");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mb-4 p-4 w-full md:w-3/5 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <Player
            src="https://lottie.host/0d33cc09-0116-4566-b499-b44d2d3abf12/n903zNeOR6.json"
            loop
            autoplay
          />
        </div>
        <div className="flex-1 w-full">
          <h1 className="text-2xl font-bold mb-4">My Planner</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={addTask}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Task
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="bg-gray-100 p-4 mb-2 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4 items-start cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{task.task_name}</h3>
                  <p>{task.task_description}</p>
                  <p>
                    Status: {task.completed_status ? "Completed" : "Incomplete"}
                  </p>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => editTask(task)}
                    className="text-yellow-500 hover:text-yellow-700"
                    aria-label="Edit"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {isModalOpen && currentTask && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              taskName={currentTask.task_name}
              taskDescription={currentTask.task_description}
              onSave={saveTask}
            />
          )}
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
