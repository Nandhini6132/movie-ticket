import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Box, Divider, Paper } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieToGetDetails } from "../../slice/MovieSlice";
import TextField from "@mui/material/TextField";
import MovieBannerComponent from "./MovieBannerComponent";
import TheaterOptionComponent from "./TheaterOptionComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer/Footer";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieToGetDetails(id));
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MovieSessions = ({ handleChange, value, toogleOpen, location, handleOpen, theater }) => {
  console.log(theater)
  const date = new Date();
  const todayDate = date.getDate();
  const getMonth = date.getMonth();
  const getDay = date.getDay();

  const { id } = useParams();
  console.log(date, "date");

  console.log(todayDate, getMonth, getDay);
  let month;
  let day;

  switch (getMonth) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "";
  }

  console.log(month);

  switch (getDay) {
    case 1:
      day = "Mon";
      break;

    case 2:
      day = "Tue";
      break;

    case 3:
      day = "Wed";
      break;

    case 4:
      day = "Thru";
      break;

    case 5:
      day = "Fri";
      break;

    case 6:
      day = "Sat";
      break;

    default:
      day = "Sun";
      break;
  }

  console.log(day);
  let today;
  let tomarrow;
  if (todayDate) {
    today = "Today";
  }

  console.log(today, tomarrow);

  const movieselector = useSelector((state) => state.allMovie.movieDetail);
  const runtimeInMinutes = movieselector?.runtime;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;

  const releaseDate = movieselector?.release_date;

  const dateObj = new Date(releaseDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  let showTime = ["09:10 AM", "11:30 AM", "02:00 PM", "06:00 PM"];

  const getCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
      }`;
    return currentTime;
  };

  const isTimePast = (currentTime, showTime) => {
    const [showHours, showMinutes, showPeriod] = showTime.split(/:| /);
    let hours = parseInt(showHours, 10);
    if (showPeriod === "PM" && hours !== 12) {
      hours += 12;
    } else if (showPeriod === "AM" && hours === 12) {
      hours = 0;
    }
    const showTime24 = `${hours < 10 ? "0" + hours : hours}:${showMinutes}`;

    return currentTime > showTime24;
  };

  const currentTime = getCurrentTime();

  //theater details
  const [isTheaterSelected, setIsTheaterSelected] = useState(false)
  let displayTime;
  let filteredTheater = theater.map(a => a).filter(a => a.name === location)


  useEffect(() => {
    if (location === null) {
      toast.error('Please choose the location', {
        message: 'Please choose the location',
        autoClose: 1000,

      })
    }
  }, [])
  console.log(filteredTheater)
  return (
    <>
    
      <Container fluid className="p-0">
        <ToastContainer position="top-center" theme="dark" />
        <MovieBannerComponent
          movieselector={movieselector}
          hours={hours}
          minutes={minutes}
          formattedDate={formattedDate}
          toogleOpen={toogleOpen}
          id={id}
        />

        <TheaterOptionComponent isTheaterSelected={isTheaterSelected} setIsTheaterSelected={setIsTheaterSelected} />


        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              background: "white",
            }}
            pl={25}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: "#ffbf008a" },
              }}
            >
              <Tab
                label="Today"
                {...a11yProps(0)}
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    background: "#ffbf0024;",
                  },
                }}
              />
              <Tab
                label="Tomarrow"
                {...a11yProps(1)}
                sx={{
                  height: "80px",
                  "&.Mui-selected": {
                    color: "black",
                    background: "#ffbf0024;",
                  },
                }}
              />
              <Tab
                label={`${todayDate + 2}th ${month}`}
                {...a11yProps(2)}
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    background: "#ffbf0024;",
                  },
                }}
              />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <Stack
              direction="row"
              gap={4}
              sx={{
                cursor: "pointer",
                background: "white",
                margin: "5rem 10rem",
                borderRadius: "18px",
                padding: "2rem 0rem 5rem 0rem",
                height: '500px'
              }}
            >
              <Stack gap={5} width={'100%'}>
                <>
                  {filteredTheater.length !== 0 ? filteredTheater.map(a => {
                    return (
                      <React.Fragment key={a.name}>
                        {a.theaterName.map(theater => {
                          let displayTimes = theater.number === 1 ? showTime.slice(0, 5) :
                            theater.number === 2 ? showTime.slice(0, 1) :
                              showTime.slice(2, 3)
                          return (
                            <React.Fragment key={theater.id}>
                              <Divider sx={{ borderWidth: '0.5px' }} />
                              <Stack direction='row' gap={9}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#535353' }} style={{ width: '30%', display: 'flex', justifyContent: 'end' }}>{theater.name}</Typography>

                                <Stack direction={"row"} gap={3}>
                                  {displayTimes.map((time) => (

                                    <Link
                                      to={
                                        isTimePast(currentTime, time)
                                          ? "#"
                                          : `/moviesessions/${id}/${theater.id}/ticket/${time}`
                                      }
                                    >
                                      {" "}
                                      <TextField
                                        id="outlined-read-only-input"
                                        label="English"
                                        defaultValue={time}
                                        InputProps={{
                                          readOnly: true,
                                          disabled: isTimePast(currentTime, time),
                                        }}
                                        inputProps={{
                                          style: {
                                            padding: '8px 10px'
                                          }
                                        }}
                                        sx={{
                                          width: "100px",
                                          input: {
                                            cursor: isTimePast(currentTime, time)
                                              ? "not-allowed"
                                              : "pointer",
                                            background: isTimePast(currentTime, time)
                                              ? "#f5f5f5"
                                              : "#346ec22b",
                                            pointerEvents: isTimePast(currentTime, time)
                                              ? "none"
                                              : "auto",
                                          },
                                        }}
                                      />
                                    </Link>

                                  ))}
                                </Stack>
                              </Stack>

                            </React.Fragment>
                          )
                        })}

                      </React.Fragment>
                    )
                  }) :
                    <div>
                      <Paper className="py-3 mx-3 d-flex justify-content-between pe-3 align-items-center"> <h3 className="ps-3">Coming Soon</h3>
                        <h5 ><Link to={'/'} className="text-danger text-decoration-none">Explore Other Movies</Link></h5>
                      </Paper>

                      <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
                        <img src="https://assets-in.bmscdn.com/discovery-catalog/lib/tr:w-600/empty-state-no-movie.png" alt="" width={300} />

                        <div className="mt-4">
                          <h6 className="text-center">Oops, there are no cinemas in that location</h6>
                          <p className="text-secondary text-center
                  " style={{ fontSize: '14px' }}>Change your location to view best cinema</p>
                          <div className="text-center">
                            <button className="btn btn-sm btn-danger w-75" onClick={handleOpen}>Change Region</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </>
              </Stack>

            </Stack>

          </CustomTabPanel>


          <CustomTabPanel value={value} index={1}>
            <Stack
              direction="row"
              gap={4}
              sx={{
                cursor: "pointer",
                background: "white",
                margin: "5rem 10rem",
                borderRadius: "18px",
                padding: "2rem 0rem 5rem 0rem",
                height: '500px'
              }}
            >
              <Stack gap={5} width={'100%'}>
                <>
                  {filteredTheater.length !== 0 ? filteredTheater.map(a => {
                    return (
                      <React.Fragment key={a.name}>
                        {a.theaterName.map(theater => {
                          let displayTimes =
                            theater.number === 2 ?
                              showTime.slice(1, 4) :
                              theater.number === 1 ?
                                showTime.slice(0, 1) :
                                showTime.slice(3, 5)


                          return (
                            <React.Fragment key={theater.id}>
                              <Divider sx={{ borderWidth: '0.5px' }} />
                              <Stack direction='row' gap={9}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#535353' }} style={{ width: '30%', display: 'flex', justifyContent: 'end' }}>
                                  {theater.name}
                                </Typography>

                                <Stack direction="row" gap={3}>
                                  {displayTimes.map((time, index) => (
                                    <Link to={`/moviesessions/${id}/${theater.id}/ticket/${time}`} key={index}>
                                      <TextField
                                        id="outlined-read-only-input"
                                        label="English"
                                        defaultValue={time}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        sx={{
                                          width: "100px",
                                          input: { cursor: "pointer", background: "#346ec22b;" },
                                        }}
                                        inputProps={{
                                          style: {
                                            padding: '8px 10px'
                                          }
                                        }}
                                      />
                                    </Link>
                                  ))}
                                </Stack>
                              </Stack>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    )
                  }) :
                    <div>
                      <Paper className="py-3 mx-3 d-flex justify-content-between pe-3 align-items-center"> <h3 className="ps-3">Coming Soon</h3>
                        <h5 ><Link to={'/'} className="text-danger text-decoration-none">Explore Other Movies</Link></h5>
                      </Paper>

                      <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
                        <img src="https://assets-in.bmscdn.com/discovery-catalog/lib/tr:w-600/empty-state-no-movie.png" alt="" width={300} />

                        <div className="mt-4">
                          <h6 className="text-center">Oops, there are no cinemas in that location</h6>
                          <p className="text-secondary text-center
                 " style={{ fontSize: '14px' }}>Change your location to view best cinema</p>
                          <div className="text-center">
                            <button className="btn btn-sm btn-danger w-75" onClick={handleOpen}>Change Region</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  }
                </>
              </Stack>
            </Stack>
          </CustomTabPanel>


          <CustomTabPanel value={value} index={2}>
            <Stack
              direction="row"
              gap={4}
              sx={{
                cursor: "pointer",
                background: "white",
                margin: "5rem 10rem",
                borderRadius: "18px",
                padding: "2rem 0rem 5rem 0rem",
                height: '500px'
              }}
            >
              <Stack gap={5} width={'100%'}>
                <>
                  {filteredTheater.length !== 0 ? filteredTheater.map(a => {


                    return (
                      <React.Fragment key={a.name}>
                        {a.theaterName.map(theater => {
                          let displayTimes = theater.number === 1 ? showTime.slice(0, 2) :
                            theater.number === 2 ? showTime.slice(0, 3) :
                              showTime.slice(0, 3)
                          return (
                            <React.Fragment key={theater.id}>
                              <Divider sx={{ borderWidth: '0.5px' }} />
                              <Stack direction='row' gap={9}>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 600, color: '#535353' }}
                                  style={{ width: '30%', display: 'flex', justifyContent: 'end' }}
                                >
                                  {theater.name}
                                </Typography>

                                <Stack direction="row" gap={3}>

                                  {displayTimes.map((time, index) => (
                                    <Link to={`/moviesessions/${time.id}/${theater.id}/ticket/${time.time}`} key={index}>
                                      <TextField
                                        id="outlined-read-only-input"
                                        label="English"
                                        defaultValue={time}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        sx={{
                                          width: "100px",
                                          input: { cursor: "pointer", background: "#346ec22b;" },
                                        }}
                                        inputProps={{
                                          style: {
                                            padding: '8px 10px'
                                          }
                                        }}
                                      />
                                    </Link>
                                  ))}
                                </Stack>
                              </Stack>
                            </React.Fragment>
                          )
                        })
                        }
                      </React.Fragment>
                    )
                  }) :
                    <div>
                      <Paper className="py-3 mx-3 d-flex justify-content-between pe-3 align-items-center"> <h3 className="ps-3">Coming Soon</h3>
                        <h5 ><Link to={'/'} className="text-danger text-decoration-none">Explore Other Movies</Link></h5>
                      </Paper>

                      <div className="d-flex justify-content-center mt-5 flex-column align-items-center">
                        <img src="https://assets-in.bmscdn.com/discovery-catalog/lib/tr:w-600/empty-state-no-movie.png" alt="" width={300} />

                        <div className="mt-4">
                          <h6 className="text-center">Oops, there are no cinemas in that location</h6>
                          <p className="text-secondary text-center
                 " style={{ fontSize: '14px' }}>Change your location to view best cinema</p>
                          <div className="text-center">
                            <button className="btn btn-sm btn-danger w-75" onClick={handleOpen}>Change Region</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </>
                {/* {theater.map(theater => {

                  let displayTimes = theater.id === 'pvr' ? showTime.slice(0, 2) : showTime;

                  return (
                 
                  );
                })} */}

              </Stack>
            </Stack>
          </CustomTabPanel>
        </Box>
      </Container>
      
    </>
  );
};






export default MovieSessions;
