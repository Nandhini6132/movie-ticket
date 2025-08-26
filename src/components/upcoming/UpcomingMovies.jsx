import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCastAndCrew,
  fetchMovieToGetDetails,
  fetchMovieToPlayVideo,
  fetchUpcomingMovie,
} from "../../slice/MovieSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
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
import { Container } from "react-bootstrap";

const date = new Date();
const year = date.getFullYear();
let month = (date.getMonth() + 1).toString();
const todayDate = date.getDate().toString();
if (month.length === 1 || todayDate.length === 1) {
  month = `0${month}`;
}
const rel_date = `${year}-${month}-${todayDate}`;

const UpcomingMovies = () => {
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const upcomingSelector = useSelector((state) => state.allMovie.upcomingMovie);
  const selectorToPlayVideo = useSelector((state) => state.allMovie.playVideo);
  const castcrew = useSelector((state) => state.allMovie.castcrew);
  const cast = castcrew && castcrew.cast ? castcrew.cast.slice(0, 6) : [];
  const crew = castcrew && castcrew.crew ? castcrew.crew.slice(0, 3) : [];

  const singleMovieSelector = useSelector(
    (state) => state.allMovie.movieDetail
  );

  const dispatch = useDispatch();
  const runtimeInMinutes = singleMovieSelector.runtime;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const releaseDate = singleMovieSelector.release_date;
  const dateObj = new Date(releaseDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const toogleOpen = async (id) => {
    dispatch(fetchCastAndCrew(id));
    dispatch(fetchMovieToGetDetails(id));
    setDrawer(true);
  };

  //vdo
  const handlePlayVideo = async (id) => {
    setOpen(true);

    dispatch(fetchMovieToPlayVideo(id));
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const handleClose = () => setOpen(false);

  const toogleClose = () => {
    setDrawer(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setUpcomingMovie(
        upcomingSelector.filter((a) => a.release_date >= rel_date)
      );

      dispatch(fetchUpcomingMovie());
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="movie-list mt-5">
        {upcomingSelector?.map((movie, index) => (
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
            <CardActionArea sx={{ position: "relative" }}>
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  backgroundColor: "#ffbf00",
                  padding: "4px 20px",
                }}
              >
                Upcoming
              </Typography>

              <CardMedia
                component="img"
                height="400"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Movie Poster"
              />

              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  {movie.title}
                </Typography>
                <Typography>
                  {movie.original_language === "en" ? "English" : "Hindi"}
                </Typography>
                <Stack direction="row" gap={5}>
                  <button className="btn btn-outline-warning">
                    <InfoIcon onClick={() => toogleOpen(movie.id)} />
                  </button>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
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
              {singleMovieSelector.original_title}
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
                    {singleMovieSelector.genres?.map((a) => (
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
                {singleMovieSelector.overview}
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
  );
};

export default UpcomingMovies;

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
