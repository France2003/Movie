import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input 
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white" 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input 
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white" 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input 
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white" 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
            />
          </div>
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to={`/login`} className="text-blue-500 hover:text-blue-400">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
