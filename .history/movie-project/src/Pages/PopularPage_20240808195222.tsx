import { useState } from "react";
import { Helmet } from "react-helmet";
import MoviesListNoSwiper from "../MoviesListNoSwiper";

const PopularPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
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
          <MoviesListNoSwiper url={`/popular`} page={currentPage} setTotalPages={setTotalPages} />
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded-l"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default PopularPage;