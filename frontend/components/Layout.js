
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Notepad Logo */}
              <div className="relative mr-3">
                <div className="w-8 h-10 bg-white rounded-sm shadow-md flex items-center justify-center">
                  <div className="w-5 h-6 bg-indigo-100 rounded-sm flex flex-col items-center justify-center">
                    <div className="w-4 h-0.5 bg-indigo-400 mb-1"></div>
                    <div className="w-4 h-0.5 bg-indigo-400 mb-1"></div>
                    <div className="w-4 h-0.5 bg-indigo-400"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-300 rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold text-white">Project Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white opacity-90">Welcome, {user?.email}</span>
              <div className="relative group">
                <button
                  onClick={handleLogout}
                  className="text-white p-2 rounded-full hover:bg-indigo-500 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Log out
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}