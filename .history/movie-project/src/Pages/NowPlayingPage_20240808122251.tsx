import { Helmet } from "react-helmet";
import MoviesListNoSwiper from "../MoviesListNoSwiper";

const NowPlayingPage = () => {
    return(
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Now Playing</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <section className="movies-container container" id="movies">
                <div className="heading mt-20">
                    <h2 className="heading-title ">Now Playing</h2>
                </div>
                    <div className="popular-content swiper flex gap-5 flex-wrap justify-between">
                        <MoviesListNoSwiper url={`/top_rated`} />
                    </div>   
            </section>
        </>
  
        
    ) 
};

export default NowPlayingPage;