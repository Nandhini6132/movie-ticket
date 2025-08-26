import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import "../../components/header/Header.css";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { CardActionArea } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import chennai from "../../assets/chennaiS.png";
import chennaiO from "../../assets/chennai.png";
import vellore from "../../assets/vellore.png";
import velloreS from "../../assets/velloreS.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies, fetchMovieToGetDetails, getLocation } from "../../slice/MovieSlice";
import bangloreO from "../../assets/bangloreO.png";
import banglore from "../../assets/banglore.jpg";
import hyderabadO from "../../assets/hyderabadO.png";
import hyderabad from "../../assets/hyderabad.png";
import mumbai from "../../assets/mumbai.png";
import mumbaiO from "../../assets/mumbaiO.png";
import delhi from "../../assets/delhi.png";
import delhiO from "../../assets/delhiO.png";
import {Search} from 'lucide-react'
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
const Header = ({
  handleLogin,
  user,
  handleLogOut,
  location,
  setLocation,
  handleClose,
  handleOpen,
  open,
}) => {
  const dispatch = useDispatch();

  const onSetLocation = (location) => {
    setLocation(location);
    handleClose();
    dispatch(getLocation(location));
  };

  const [ariaExpanded, setAriaExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchId, setSearchId] = useState(null);
  
  const selector = useSelector((state) => state.allMovie.movie);
  const titArray = Array.isArray(selector) ? selector.map(a => a.original_title) : [];

  useEffect(() => {
    setSearchId(null);
  }, []);

  const handleSearch = () => {
    const searchTerms = searchTerm.toLowerCase();

    if (searchTerm === '') {
      dispatch(fetchAllMovies());
      setSearchId(null);
    } else if (titArray.length > 0) {
      const matchedMovie = selector.find(a => a.original_title.toLowerCase() === searchTerms);
      if (matchedMovie) {
        console.log(matchedMovie.id);
        setSearchId(matchedMovie.id);
        dispatch(fetchAllMovies(matchedMovie.id));
      } else {
        console.log('No match found');
       
      }
    }
  };
const fetchMovie=async()=>{
  let resp= await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=2685c7ff5ed7c6d106338b0631c3a318
  `)
  console.log(resp.data.genres);
}
  useEffect(()=>{
    fetchMovie()
  },[])
  return (
    <>
      <Navbar
        expand="lg"
        className="header"
        style={{ boxShadow: "0 0px 0px 2px #f3f3f3", background: "white" }}
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <Stack>
              <Typography variant="h6" className="colan d-flex">
                sho <span className="wb">WB</span> uddy
              </Typography>
              {/* <Typography variant="body2">Cinemas</Typography> */}
            </Stack>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex justify-content-between" style={{ flex: 1 }}>
              <Nav className="w-100" >
                <div className="d-flex w-75"  style={{ border: '2px solid #dfdfdf', outline: 'none' }}>
                  
                  <input type="text" className="w-100 ps-2" placeholder="Search for Movies" value={searchTerm} style={{outline:'none', border:'none'}} onChange={(e)=>setSearchTerm(e.target.value)}/>
                  <Search className="me-3" onClick={handleSearch} style={{cursor:'pointer'}} color="#dfdfdf"/>
                  
                </div>
              </Nav>
              {/* <Nav className="me-5 ms-3">
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                    color: "#ffbf00",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  <Nav href="#home">Movies</Nav>
                </Link>
              </Nav> */}
            </div>
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              <Nav onClick={handleOpen} style={{ cursor: "pointer" }}>
                {location ? location : "Choose Location"}
              </Nav>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  "&.MuiStack-root": {
                    position: "absolute",
                    top: "26% !important",
                    left: "50%",
                  },
                }}
              >
                <Stack gap={5} sx={style}>
                  <div>
                    <Typography className="text-center mb-1">
                      Popular cities
                    </Typography>

                    <div className="d-flex gap-5">
                      {cities.map((city, index) => (
                        <div key={index}>
                          <div
                            style={{
                              backgroundImage: `url(${location === city.city
                                  ? city.clickImg
                                  : city.img
                                })`,
                              height: "100px",
                              width: "100px",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => onSetLocation(city.city)}
                          ></div>
                          <Typography className="text-center">
                            {city.city}
                          </Typography>
                        </div>
                      ))}
                    </div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header
                          class={`text-center accodianHeader`}
                          onClick={() => setAriaExpanded(!ariaExpanded)}
                        >
                          {ariaExpanded ? "View All cities" : "Hide cities"}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="d-flex flex-wrap gap-3">
                            {otherCities
                              .sort((a) => a)
                              .map((a,i) => (
                                <h6 key={i}
                                  onClick={() => onSetLocation(a)}
                                  className="singleCity pb-2"
                                >
                                  {a}
                                </h6>
                              ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Stack>
              </Modal>
              {/* <Nav onClick={user?handleLogOut:handleLogin}>{user?'Logout':'Login'}</Nav> */}
              <Nav>
                {user ? (
                  <Link to={"/personalDetail"}>
                    <Avatar
                      sx={{ width: "30px", height: "30px" }}
                      src={auth?.currentUser?.photoURL}
                      alt={auth?.currentUser?.displayName}
                    ></Avatar>
                  </Link>
                ) : (
                  <button
                    className="btn btn-outline-warning text-dark"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const cities = [
  {
    id: 1,
    city: "Vellore",
    img: velloreS,
    clickImg: vellore,
  },

  {
    id: 2,
    city: "Chennai",
    img: chennai,
    clickImg: chennaiO,
  },

  {
    id: 3,
    city: "Banglore",
    img: banglore,
    clickImg: bangloreO,
  },
  {
    id: 4,
    city: "Hyderabad",
    img: hyderabad,
    clickImg: hyderabadO,
  },
  {
    id: 5,
    city: "Mumbai",
    img: mumbai,
    clickImg: mumbaiO,
  },
  {
    id: 6,
    city: "Delhi",
    img: delhi,
    clickImg: delhiO,
  },
];

const otherCities = [
  "Amravati",
  "Ahmedabad",
  "Tirupatur",
  "Vaniyambadi",
  "Ambur",
  "Gudiyatham",
  "Madurai",
  "Coimbatore",
  "Erode",
  "Salem",
  "Kochi",
  "Alapuzha",
  "Tirvandram",
  "Vizag",
  "Nellore",
  "Chitor",
  "Katpadi",
  "Ranipet",
  "NCR",
  "Punjab",
  "Haryana",
  "Chandigrah",
  "Nagpur",
  "Manipur",
  "Goa",
  "Hosur",
  "Krishnagiri",
  "Pune",
  "Orissa",
  "Tirupati",
];

export default Header;
