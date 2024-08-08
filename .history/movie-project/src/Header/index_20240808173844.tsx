import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { SiFireship } from "react-icons/si";
import { MdExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import NavbarItem from "../Component/NavbarItem";

function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header>
            <div className="nav container w-[1060px]">
                <Link className="logo" to={`/Movie`}>MOVIE<span>VENNIE</span></Link>
                <form onSubmit={handleSearch} className="search-box h-10 flex items-center">
                    <input
                        type="search"
                        id="search-input"
                        placeholder="Search Movie"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="p-2 rounded-l-md"
                    />
                    <button type="submit" className="p-2">
                        <IoSearch className="text-xl" />
                    </button>
                </form>

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
