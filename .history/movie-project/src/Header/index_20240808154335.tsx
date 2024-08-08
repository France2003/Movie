import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { SiFireship } from "react-icons/si";
import { MdExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import NavbarItem from "../Component/NavbarItem";
function Header() {
    return (
        <header>
            <div className="nav container w-[1060px]">
                <Link className="logo" to={`/Project`}>MOVIE<span>VENNIE</span></Link>
                <div className="search-box h-10">
                    <input type="search" name="" id="search-input" placeholder="Search Movie" />
                    <IoSearch className="text-xl" />
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