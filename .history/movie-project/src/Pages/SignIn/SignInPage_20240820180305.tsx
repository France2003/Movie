import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaEye,FaEyeSlash } from "react-icons/fa";
function Login({ url }: { url: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                // Add your API call or logic here
            } catch (err) {
                // Handle any errors here
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [url]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return (
            <div className="loading-spinner m-auto">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white container_signin">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
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
                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                        />
                        <div
                            className="absolute mt-[30px] inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FaEyeSlash/>
                            ) : (
                                <FaEye/>
                            )}
                        </div>
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
