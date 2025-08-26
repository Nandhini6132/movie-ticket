import React from "react";
import "../footer/footer.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { FaPinterestP } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const selector = useSelector((state) => state.allMovie.movie);
  const upcomingSelector = useSelector(
    (state) => state.allMovie.upcomingMovie
  ).slice(0, 5);
  return (
    <div className="footer">
      <div className="container pt-4">
        <div>
          <h6 className="topics">MOVIES NOW SHOWING IN VELLORE</h6>
          <div className="d-flex gap-2 text-secondary pt-2">
            {selector.length>1&& (
                <>
                   {selector?.map((movie, index) => (
              <Link
                to={`/moviesessions/${movie.id}`}
                key={index}
                className={`${index !== 4 && "borderClass"} textColor`}
              >
                {movie.original_title}
              </Link>
            ))}
                </>
            )}
        
          </div>
        </div>

        {/* //upcoming */}
        <div>
          <h6 className="topics pt-4">UPCOMING MOVIES IN VELLORE</h6>
          <div className="d-flex gap-2 text-secondary pt-2">
            {upcomingSelector.map((movie, index) => (
              <h6
                key={index}
                className={`${index !== 4 && "borderClass"} textColor`}
              >
                {movie.original_title}
              </h6>
            ))}
          </div>
        </div>

        {/* movie genres */}
        {generes.map((movie, index) => (
          <>
            <h6 key={index} className="topics pt-4">
              {movie.topic}
            </h6>
            <div className="d-flex gap-2 text-secondary pt-2">
              {movie.categories.map((moviename, index) => (
                <h6
                  key={index}
                  className={`${
                    index !== moviename.length && "borderClass"
                  } textColor`}
                >
                  {moviename}
                </h6>
              ))}
            </div>
          </>
        ))}
      </div>
      {/* links */}
      <div className="d-flex mt-4 ps-5 pe-5">
        <hr className="hr" />
        <Typography
          variant="h6"
          className="colan d-flex text-light justify-content-center"
          sx={{ width: "10%" }}
        >
          sho <span className="wb">WB</span> uddy
        </Typography>
        <hr className="hr" />
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        {icons.map((Icon, index) => (
          <div className="icon">
            <Icon key={index} />
          </div>
        ))}
      </div>

      <div>
        <h6>copyright 2024 </h6>
      </div>
    </div>
  );
};

const generes = [
  {
    topic: "MOVIE BY GENERE",
    categories: [
      "Drama Movies",
      "Action Movies",
      "Comedy Movies",
      "Crime Movies",
      "Romantic Movies",
      "Adaptation Movies",
    ],
  },
  {
    topic: "UPCOMING MOVIES BY GENERE",
    categories: [
      "Movies in Drama",
      " Movies in Action",
      " Movies in Comedy",
      " Movies in Crime",
      " Movies in Romantic",
    ],
  },
];

const icons = [FaFacebookF, FaInstagram, CiYoutube, FaPinterestP, FaLinkedinIn];
console.log(generes.map((a) => a).map((ab) => ab.categories.length));
export default Footer;
