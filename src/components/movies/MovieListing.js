import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../movies/MovieListing.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Modal,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import {
  fetchAllMovies,
  fetchMovieToPlayVideo,
  fetchMovieToGetDetails,
  fetchUpcomingMovie,
  fetchCastAndCrew,
} from "../../slice/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import Filter from "../filter/Filter";
import { ArrowBigRight, ChevronRight, ChevronsRight } from "lucide-react";

const MovieListing = ({ user, handleLogin, location}) => {
  console.log(location)
  const [movie, setMovie] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [getDetails, setGetDetails] = useState([]);
  const [video, setVideo] = useState();
  const [drawer, setDrawer] = useState(false);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.allMovie.movie);
  const upcomingSelector = useSelector((state) => state.allMovie.upcomingMovie);

  const selectorToPlayVideo = useSelector((state) => state.allMovie.playVideo);
  const singleMovieSelector = useSelector(
    (state) => state.allMovie.movieDetail
  );
  const castcrew = useSelector((state) => state.allMovie.castcrew);
  const cast = castcrew && castcrew.cast ? castcrew.cast.slice(0, 6) : [];
  const crew = castcrew && castcrew.crew ? castcrew.crew.slice(0, 3) : [];

  const [upcomingMovie, setUpcomingMovie] = useState([]);

  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  const todayDate = date.getDate().toString();
  if (month.length === 1 || todayDate.length === 1) {
    month = `0${month}`;
  }
  const rel_date = `${year}-${month}-${todayDate}`;


  useEffect(() => {
    const fetchData = async () => {
      setUpcomingMovie(
        upcomingSelector.filter((a) => a.release_date >= rel_date)
      );



      dispatch(fetchAllMovies());
      dispatch(fetchUpcomingMovie());
    };

    fetchData();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClose = () => setOpen(false);

  const handlePlayVideo = async (id) => {
    setOpen(true);

    dispatch(fetchMovieToPlayVideo(id));
  };

  const handleSingleMovie = async (id) => {
    dispatch(fetchMovieToGetDetails(id));
  };
  const toogleOpen = async (id) => {
    dispatch(fetchCastAndCrew(id));
    dispatch(fetchMovieToGetDetails(id));
    setDrawer(true);
  };
  const toogleClose = () => {
    setDrawer(false);
  };

  const runtimeInMinutes = singleMovieSelector?.runtime;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60 ;

  const releaseDate = singleMovieSelector?.release_date;

  const dateObj = new Date(releaseDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const [imageStatus, setImageStatus] = useState("loading"); // 'loading', 'loaded', or 'error'

  const handleImageLoad = () => {
    setImageStatus("loaded");
  };

  const handleImageError = () => {
    setImageStatus("error");
  };

  return (
    <div>
     <div className="d-flex container mt-5 gap-5">
     <Filter/>
      <div className="container">
        <div className="mb-5 d-flex justify-content-between align-items-center px-4 py-4" style={{background:'white', borderRadius:'10px'}}>
          <h4>Coming soon</h4>
          <Link to={'/upcoming'} className="text-danger text-decoration-none fw-semibold"><span>Explore Upcoming Movies</span> <span> <ChevronsRight/> </span></Link>
        </div>
        <h3 className=" streaming">{location?`Movies in ${location}` :'Now Streaming'}</h3>
        <div className="movie-list mt-5">
          {selector?.length > 1 ? (
           <>
           {   selector?.map((movie, index) => (
              <Card
                key={index}
                sx={{
                  width: 250,
                  boxShadow: "none",
                  background: "none",
                  position: "relative",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredIndex === index && (
                  <PlayArrowIcon
                    sx={{
                      position: "absolute",
                      fontSize: "90px",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                      color: "white",
                      backdropFilter: "blur(2px)",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePlayVideo(movie.id)}
                  />
                )}
                <CardActionArea>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    height={400}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    alt="Movie Poster"
                    style={{
                      display: imageStatus === "loading" ? "none" : "block",
                      width: "100%",
                    }}
                  />

            

                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {movie.title}
                    </Typography>
                    <Typography>
                      {movie.original_language === "en" ? "English" : "Hindi"}
                    </Typography>
                    <Stack direction="row" gap={5}>
                      <Link to={`/moviesessions/${movie.id}`}>
                        {" "}
                        <button
                          onClick={
                            user
                              ? () => handleSingleMovie(movie.id)
                              : handleLogin
                          }
                          className="btn btn-warning"
                        >
                          Book Tickets
                        </button>
                      </Link>

                      <button className="btn btn-outline-warning">
                        <InfoIcon onClick={() => toogleOpen(movie.id)} />
                      </button>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
           </>
          ) : (
            <>
            <Card
               
                sx={{
                  width: 250,
                  boxShadow: "none",
                  background: "none",
                  position: "relative",
                }}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredIndex ===  (
                  <PlayArrowIcon
                    sx={{
                      position: "absolute",
                      fontSize: "90px",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                      color: "white",
                      backdropFilter: "blur(2px)",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePlayVideo(selector.id)}
                  />
                )}
                <CardActionArea>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    height={400}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    alt="Movie Poster"
                    style={{
                      display: imageStatus === "loading" ? "none" : "block",
                      width: "100%",
                    }}
                  />

            

                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {selector.title}
                    </Typography>
                    <Typography>
                      {selector.original_language === "en" ? "English" : "Hindi"}
                    </Typography>
                    <Stack direction="row" gap={5}>
                      <Link to={`/moviesessions/${movie.id}`}>
                        {" "}
                        <button
                          onClick={
                            user
                              ? () => handleSingleMovie(movie.id)
                              : handleLogin
                          }
                          className="btn btn-warning"
                        >
                          Book Tickets
                        </button>
                      </Link>

                      <button className="btn btn-outline-warning">
                        <InfoIcon onClick={() => toogleOpen(selector.id)} />
                      </button>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          )}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <iframe
              controls
              width="100%"
              height="100%"
              src={
                selectorToPlayVideo
                  ? `https://www.youtube.com/embed/${selectorToPlayVideo.key}?rel=0`
                  : ""
              }
            />
          </Box>
        </Modal>

        <Drawer
          open={drawer}
          onClose={toogleClose}
          anchor="bottom"
          PaperProps={{ sx: { borderRadius: "20px 20px 0 0" } }}
        >
          <Container fluid className="ps-5">
            <Box
              role="presentation"
              onClick={toogleClose}
              className="mt-3"
              sx={{ marginLeft: "10rem", marginRight: "10rem" }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {singleMovieSelector?.original_title}
              </Typography>
              <Stack direction={"row"}>
                {" "}
                U
                <ul className="d-flex gap-5" style={{ listStyleType: "disc" }}>
                  <li>{`${hours}h ${minutes}min`}</li>
                  <li>{formattedDate}</li>
                  <li>
                    {" "}
                    <li className="d-flex gap-2">
                      {singleMovieSelector?.genres?.map((a) => (
                        <p>{a.name}</p>
                      ))}
                    </li>
                  </li>
                  <li>English</li>
                </ul>
              </Stack>

              <Stack className="mt-5">
                <Typography variant="h6">Synopsis</Typography>
                <Typography className="mt-2">
                  {singleMovieSelector?.overview}
                </Typography>
              </Stack>

              <Stack>
                <Typography variant="h5" className="mt-5">
                  Cast
                </Typography>
                <div className="d-flex gap-5">
                  {cast &&
                    cast.map((member, index) => (
                      <div>
                        <img
                          key={index}
                          src={`https://image.tmdb.org/t/p/w400/${member.profile_path}`}
                          alt={`Profile of ${member.name}`}
                          width={200}
                          height={200}
                          style={{ borderRadius: "15px" }}
                        />
                        <Typography>{member.name}</Typography>
                      </div>
                    ))}
                </div>

                <div></div>
              </Stack>

              <Stack>
                <Typography variant="h5" className="mt-5">
                  Crew
                </Typography>
                <div className="d-flex gap-5">
                  {crew &&
                    crew.map((member, index) => (
                      <div>
                        <img
                          key={index}
                          src={`https://image.tmdb.org/t/p/w400/${member.profile_path}`}
                          alt={`Profile of ${member.name}`}
                          width={200}
                          height={200}
                          style={{ borderRadius: "15px" }}
                        />
                        <Typography>{member.name}</Typography>
                        <Typography>({member.department})</Typography>
                      </div>
                    ))}
                </div>

                <div></div>
              </Stack>
            </Box>
          </Container>
        </Drawer>

      </div>
     </div>
     
    </div>
  );
};

export default MovieListing;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
