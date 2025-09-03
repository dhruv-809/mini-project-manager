
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask, setFilter, setSortBy } from '../store/taskSlice';

export default function TaskList({ project, tasks, onAddTask }) {
  const dispatch = useDispatch();
  const { filter, sortBy, loading: tasksLoading } = useSelector((state) => state.tasks);

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, status: newStatus }));
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return a.title.localeCompare(b.title);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ToDo': return 'bg-gray-100 text-gray-800';
      case 'In-Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{project.title} - Tasks</h2>
        <button
          onClick={onAddTask}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Task
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="flex space-x-4 mb-6">
          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Tasks ({tasks.length})</option>
            <option value="ToDo">To Do ({tasks.filter(t => t.status === 'ToDo').length})</option>
            <option value="In-Progress">In Progress ({tasks.filter(t => t.status === 'In-Progress').length})</option>
            <option value="Done">Done ({tasks.filter(t => t.status === 'Done').length})</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      )}

      {tasksLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading tasks...</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
                <div key={task._id} className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="ToDo">To Do</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : tasks.length === 0 ? (
              <div className="text-center py-16 bg-green-50 rounded-lg border-2 border-dashed border-green-200">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No tasks yet</h3>
                <p className="text-gray-600 mb-6">
                  This project doesn't have any tasks yet. Start by creating your first task to track your progress.
                </p>
                <button
                  onClick={onAddTask}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 inline-flex items-center font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Create Your First Task
                </button>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-500 mb-4">
                  No tasks match your current filter: <span className="font-medium capitalize">{filter.replace('-', ' ')}</span>
                </p>
                <div className="space-x-3">
                  <button
                    onClick={() => dispatch(setFilter('all'))}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    View All Tasks
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={onAddTask}
                    className="text-green-600 hover:text-green-500 font-medium"
                  >
                    Add New Task
                  </button>
                </div>
              </div>
            )}
          </div>

          {tasks.length > 0 && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-600">{tasks.filter(t => t.status === 'ToDo').length}</div>
                  <div className="text-sm text-gray-500">To Do</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'In-Progress').length}</div>
                  <div className="text-sm text-gray-500">In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'Done').length}</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.status === 'Done').length / tasks.length) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100) : 0}% Complete
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}