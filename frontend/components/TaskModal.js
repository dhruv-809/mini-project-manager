
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/taskSlice';

export default function TaskModal({ project, onClose }) {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'ToDo',
    dueDate: ''
  });
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({
      ...taskForm,
      projectId: project._id
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Task Title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Task Description"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={taskForm.status}
              onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
            >
              <option value="ToDo">To Do</option>
              <option value="In-Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}