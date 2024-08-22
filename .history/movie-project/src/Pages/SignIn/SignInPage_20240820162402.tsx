
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login({ url }: { url: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchMovies = async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          try {
            
          } catch (err) {

          } finally {
            setLoading(false);
          }
        };
    
        fetchMovies();
      }, [url, page]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white container_signin ">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to={`/Movie/register`} className="text-blue-500 hover:text-blue-400">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
