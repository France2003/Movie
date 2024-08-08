import { Helmet } from "react-helmet";
// import MoviesList from "../MoviesList";
import MoviesListNoSwiper from "../MoviesListNoSwiper";

const PopularPage = () => {
    return(
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Popular</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <section className="popular container popular-route" id="popular">
                <div className="heading">
                    <h2 className="heading-title">Popular Movies</h2>
                </div>
                <div className="popular-content swiper flex gap-5 flex-wrap justify-between">
                    <MoviesListNoSwiper url={`/popular`} />
                </div>
            </section>
        </>
    )
    

};

export default PopularPage;