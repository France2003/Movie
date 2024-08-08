import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { SiFireship } from "react-icons/si";
import { MdExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import NavbarItem from "../Component/NavbarItem";

const API = "https://api.themoviedb.org/3/search/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

function Header() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query.trim()) {
            const fetchResults = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(API, {
                        params: { query },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setResults(response.data.results);
                } catch (error: any) {
                    setError("Failed to fetch search results.");
                } finally {
                    setLoading(false);
                }
            };

            const timeoutId = setTimeout(fetchResults, 500); // Delay for debounce
            return () => clearTimeout(timeoutId); // Cleanup on unmount or query change
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <header>
            <div className="nav container w-[1060px]">
                <Link className="logo" to={`/Movie`}>MOVIE<span>VENNIE</span></Link>
                <div className="relative">
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search Movie"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="p-2 rounded-l-md"
                    />
                    <IoSearch className="text-xl absolute top-2 right-2" />
                    {query && results.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                            <ul>
                                {results.map((movie) => (
                                    <li key={movie.id} className="p-2 border-b w-[300px] border-gray-300 flex items-center">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-12 h-16 object-cover rounded-md mr-2"
                                        />
                                        <Link to={`/movie/${movie.id}`} className="block">
                                            <span className="text-black">{movie.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {loading && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 p-2">
                            Loading...
                        </div>
                    )}
                    {error && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 p-2 text-red-600">
                            {error}
                        </div>
                    )}
                </div>

                <a href="#" className="user">
                    <img src="https://www.footballtodaylive.com/team-logo/Phil-Foden.png" alt="" className="user-img" />
                </a>

                <div className="navbar">
                    <Link to={`/Movie`}><NavbarItem type="nav-active" icon={<AiOutlineHome />} label="Home" /></Link>
                    <Link to={`/Movie/popular`}><NavbarItem icon={<SiFireship />} label="Popular" /></Link>
                    <Link to={`/Movie/now_playing`}><NavbarItem icon={<MdExplore />} label="Now Playing" /></Link>
                    <Link to={`/Movie/movies`}><NavbarItem icon={<PiTelevisionSimpleBold />} label="Movies" /></Link>
                    <Link to={`/Movie/favourite`}><NavbarItem icon={<FaRegHeart />} label="Favourite" /></Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
