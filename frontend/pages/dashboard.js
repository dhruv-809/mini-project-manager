
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { fetchProjects, createProject } from '../store/projectSlice';
import { fetchTasks } from '../store/taskSlice';

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: '', description: '' });
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    dispatch(fetchProjects());
  }, [token, router, dispatch]);

  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchTasks(selectedProject._id));
    }
  }, [selectedProject, dispatch]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    dispatch(createProject(projectForm));
    setProjectForm({ title: '', description: '' });
    setShowProjectForm(false);
  };

  if (!token) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Manager</h1>
          <button
            onClick={() => setShowProjectForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {projectsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-500 mb-4">Get started by creating your first project</p>
                  <button
                    onClick={() => setShowProjectForm(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Create Your First Project
                  </button>
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    isSelected={selectedProject?._id === project._id}
                    onClick={() => setSelectedProject(project)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedProject ? (
              <TaskList
                project={selectedProject}
                tasks={tasks}
                onAddTask={() => setShowTaskModal(true)}
              />
            ) : projects.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Project Manager!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start organizing your work by creating your first project. You can then add tasks and track your progress.
                </p>
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    Create projects to organize your work
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    Add tasks with due dates and status tracking
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    Filter and sort tasks to stay organized
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-yellow-50 rounded-lg">
                <div className="mx-auto w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a project to get started</h3>
                <p className="text-gray-500">Choose a project from the left to view and manage its tasks</p>
              </div>
            )}
          </div>
        </div>

        {showProjectForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
              <form onSubmit={handleCreateProject}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Project Description"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showTaskModal && selectedProject && (
          <TaskModal
            project={selectedProject}
            onClose={() => setShowTaskModal(false)}
          />
        )}
      </div>
    </Layout>
  );
}