import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiPlay } from "react-icons/fi";
interface IMoviesDetail{
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  genres: IType[]
  production_companies:ICompany[]
}
interface IType{
  id: number;
  name: string;
}
interface ICompany{
  name: string;
  logo_path:string;
}
const API = "https://api.themoviedb.org/3/movie/";
const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmY0YWJjNGUzMTEyYzNhOGIyODMwMWMxYWQwMzllZSIsInN1YiI6IjY0MTI3N2Q2ZTE4ZTNmMDdkMDU1ZjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iw5OvKuR35yRllO8eoRWjvCQnlFmh8nieiLD9NpSDc8`;

// const LoadingProduct = () => {
//   return (
//     <div className="flex gap-x-10 my-20">
//       <div className="photo w-[200px]">
//         <Skeleton height={200} width={200} />
//       </div>
//       <div className="product_info flex-1">
//         <Skeleton count={3} />
//       </div>
//     </div>
//   );
// };

const MoviesDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log("<<=== 🚀 params ===>>", params);

  const id = params.id ? parseInt(params.id) : 0;
  //TODO: handle việc truyền id = 0;

  useEffect(() => {
    if (id === 0) {
      navigate("/CV-homework"); //chuyển hướng sang trang /products
    }
  }, [id]);
  /*
    Fetch data và return kết quả cuối cùng
    */
  const getProducts = async (id: number) => {
    const result = await axios.get(`${API}${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  };
  /**
   * 
   query = {data,isSuccess, isError, error, isLoading }
   data: chứa kết quả trả về
   */
  const { data: movie } = useQuery<IMoviesDetail, Error>({
    queryKey: ["products-detail", id], //key khong trung lap cua bo nho cache
    queryFn: () => getProducts(id),
  });

  return (
    <div className="detail-movie">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie?.original_title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {<>
         <div className="play-container container">

         <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie?.poster_path}`} alt="" className="play-img"/>
  
         <div className="play-text">
             <h2 className="">{movie?.original_title}</h2>
  
             <div className="rating">
                 <i className='bx bxs-star'></i>
                 <i className='bx bxs-star'></i>
                 <i className='bx bxs-star'></i>
                 <i className='bx bxs-star'></i>
                 <i className='bx bxs-star-half'></i>
             </div>
             <div className="tags">
                 <span>{movie?.genres[0].name}</span>
                 <span>{movie?.genres[1].name}</span>
                 <span>{movie?.genres[2].name}</span>
             </div>

             <a href="#" className="watch-btn">
             <div className="bx">
                    <FiPlay className=""/>
                </div>
                <span>Watch the trailler</span>
             </a>
         </div>

        

         <div className="video-container">

             <div className="video-box">
   
                 <i className='bx bx-x close-video' ></i>
             </div>
         </div>
     </div>
      
      <div className="about-movie container">
        <h2>{movie?.original_title}</h2>
        <p>{movie?.overview}</p>
     
        {/* <h2 className="cast-heading">Production Companies</h2> */}
        {/* <div className="cast">
            <div className="cast-box">
                
                <span className="cast-tittle">{movie?.production_companies[0].name}</span>
            </div>
            <div className="cast-box">
                
                <span className="cast-tittle">{movie?.production_companies[1].name}</span>
            </div>
            <div className="cast-box">
              
                <span className="cast-tittle">{movie?.production_companies[2].name}</span>
            </div>
            <div className="cast-box">
               
            </div>
            <div className="cast-box">
               
                <span className="cast-tittle">{movie?.production_companies[4].name}</span>
            </div>
            
            
          
            
        </div> */}
  </div> 

  </>
      }
    </div>
  );
};

export default MoviesDetailPage;