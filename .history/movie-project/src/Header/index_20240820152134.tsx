import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { SiFireship } from "react-icons/si";
import { MdExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import axios from "axios";
import NavbarItem from "../Component/NavbarItem";
import Phap from '../../public/Img/phappp.jpg';

const API = "https://api.themoviedb.org/3/search/movie";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

function Header() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchRef = useRef<HTMLDivElement>(null); // Reference to the search container

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setResults([]);
                setQuery(""); // Clear the query
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const clearSearch = () => {
        setQuery("");
        setResults([]);
    };

    return (
        <header>
            <div className="nav container w-[1060px]">
                <Link className="logo" to={`/Movie`}>MOVIE<span>VENNIE</span></Link>
                <div className="relative" ref={searchRef}>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search Movie"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="p-2 mr-5 pr-[50px] rounded-md border border-white"
                    />
                    <IoSearch className="text-xl absolute top-2 right-5 font-normal" />
                    {query && results.length > 0 && (
                        <>
                            <IoClose
                                onClick={clearSearch}
                                className="text-xl absolute top-2 right-2 cursor-pointer"
                                title="Clear search"
                            />
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                                <div className="max-h-[500px] overflow-y-auto p-4">
                                    <ul className="space-y-2">
                                        {results.map((movie) => (
                                            <li key={movie.id} className="p-2 border-b border-gray-300 flex items-center">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="w-12 h-16 object-cover rounded-md mr-2 border border-black"
                                                />
                                                <Link to={`/movie/${movie.id}`} className="block">
                                                    <span className="text-black">{movie.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                    {loading && (
                        <div className="absolute z-10 w-full bg-[#1e1e2a] border border-gray-300 rounded-md mt-1 p-2">
                            Loading...
                        </div>
                    )}
                    {error && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 p-2 text-red-600">
                            {error}
                        </div>
                    )}
                </div>

                <div className="relative ml-[30px]">
                    <a href="#" className="user relative">
                        <img
                            src={Phap}
                            alt=""
                            className="user-img rounded-full w-10 h-10 cursor-pointer"
                        />
                        <span className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded hidden group-hover:block">
                            Log In / Log Out
                        </span>
                    </a>
                </div>

                <div className="navbar flex space-x-4">
                    <Link to={`/Movie`}><NavbarItem type="nav-active" icon={<AiOutlineHome />} label="Home" /></Link>
                    <Link to={`/Movie/popular`}><NavbarItem icon={<SiFireship />} label="Popular" /></Link>
                    <Link to={`/Movie/now_playing`}><NavbarItem icon={<MdExplore />} label="Now Playing" /></Link>
                    <Link to={`/Movie/ranking`}><NavbarItem icon={<FaRankingStar />} label="Ranking" /></Link>
                    <Link to={`/Movie/favourite`}><NavbarItem icon={<FaRegHeart />} label="Favourite" /></Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
