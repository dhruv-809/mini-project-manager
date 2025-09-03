
import { useDispatch } from 'react-redux';
import { deleteProject } from '../store/projectSlice';

export default function ProjectCard({ project, isSelected, onClick }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(project._id));
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          x
        </button>
      </div>
    </div>
  );
}