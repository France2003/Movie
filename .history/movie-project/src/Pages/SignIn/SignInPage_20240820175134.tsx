import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <svg className="h-5 w-5 text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12l-3 3m0 0l-3-3m3 3V9m-6 3a9 9 0 018-8.937V5a7 7 0 11-8 7z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0118 0m-9 0a4 4 0 100 8 4 4 0 000-8zm5.5 3.5A9.5 9.5 0 0121 12.5m-3 2.5a8 8 0 00-4.5 2.5" />
                                </svg>
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
