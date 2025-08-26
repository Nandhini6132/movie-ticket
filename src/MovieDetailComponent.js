import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Grid, Divider, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieToGetDetails, getSnack } from "./slice/MovieSlice";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import { Row, Col } from "react-bootstrap";

const MovieDetailComponent = ({ value, user }) => {
  let tax = 4.36;
  const selector = useSelector((state) => state.allMovie.movieDetail);
  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const snackSelector = useSelector((state) => state.allMovie.overAllTotal);
  const length = showDetailsSelector?.length;
  const slicedArray = showDetailsSelector?.slice(length - 1, length);

  const seatInfo = slicedArray?.map((a) => a.comb);

  const dispatch = useDispatch();
  const [selectedSeatByUser, setSelectedSeatByUser] = useState([]);

  const amt =
    slicedArray?.map((a) => a?.seats) * slicedArray?.map((a) => a?.amount);

  const date = new Date();
  const todayDate = date.getDate();
  let bookingDate;
  if (value === 0) {
    bookingDate = todayDate;
  } else if (value === 1) {
    bookingDate = todayDate + 1;
  } else {
    bookingDate = todayDate + 2;
  }
  const { id } = useParams();
  const { time } = useParams();
  const documentId = `${bookingDate}-${id}-${time}`;

  useEffect(() => {
    dispatch(fetchMovieToGetDetails(id));
  }, []);

  useEffect(() => {
    const checkIfDataExists = async () => {
      if (user) {
        try {
          const docRef = collection(db, documentId);
          const querySnapshot = await getDocs(docRef);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSelectedSeatByUser(data);
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      } else {
        console.log("No user logged in.");
      }
    };

    checkIfDataExists();
  }, [user]);

  const snackDetailsss = useSelector((state) => state.allMovie.snacksDetail);
  const snackDetail = snackDetailsss?.filter((item) => item?.id !== undefined);

  const countSnackNames = (snackDetail) => {
    return snackDetail?.reduce((acc, item) => {
      acc[item.snackName] = (acc[item.snackName] || 0) + 1;
      return acc;
    }, {});
  };

  const snackDetailArray = snackDetail || [];
  const snackOutput = Object.entries(countSnackNames(snackDetailArray)).map(
    ([snackName, count]) => (
      <Stack key={snackName}>{`${snackName} *${count}`}</Stack>
    )
  );

  const countSnackNamesAndCalculateTotalPrice = (snackDetail) => {
    return snackDetail?.reduce((acc, item) => {
      acc[item.snackName] = acc[item.snackName] || { count: 0, totalPrice: 0 };

      acc[item.snackName].count++;
      acc[item.snackName].totalPrice += item.snackPrice || 0;
      return acc;
    }, {});
  };

  const snackOutputWithTotalPrice = Object.entries(
    countSnackNamesAndCalculateTotalPrice(snackDetailArray)
  ).map(([snackName, { count, totalPrice }]) => (
    <Stack key={snackName}>{`${totalPrice.toFixed(2)}`}</Stack>
  ));

  const add = snackDetail?.map((a) => a.snackPrice);

  const grandTotalPrice = add?.reduce((a, b) => a + b, 0);

  let grandTotal = grandTotalPrice;
  useEffect(() => {
    dispatch(getSnack({ grandTotal }));
  }, []);

  //create address for theater
  const theaterName = useSelector((state) => state.allMovie);
  console.log(theaterName.theaterName);
  let theaterAddress;
  switch (theaterName.theaterName) {
    case "pvr":
      theaterAddress = "Silk Mill, Gandhi Nagar, Vellore";
      break;
    case "inox":
      theaterAddress = "Selvam square, Vellore";
      break;
  }

  let name=theaterName?.theaterName
  console.log(name);

  return (
    <Container
      sx={{ boxShadow: " -1px -2px 0px #e9dfdf", height: "90vh", pt: 4 }}
    >
      <Box>
        <Typography>Booking Summary</Typography>
        <Divider sx={{ borderColor: "black", marginBottom: "5px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${selector?.poster_path}`}
              alt="poster"
              style={{ width: "100%", maxWidth: "140px", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: "700" }} variant="body1">
                {selector.original_title}
              </Typography>
              <Stack spacing={1}>
                <ul
                  style={{
                    display: "flex",
                    gap: "35px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <li>U/A</li>
                  <li>Drama</li>
                  <li>{selector.original_language}</li>
                </ul>
                <Typography variant="h6">
                  {slicedArray?.map((a) => a.date)},{" "}
                  {slicedArray?.map((a) => a.time)}
                </Typography>
                <Typography variant="body1">
                  {/* {typeof theaterName === "string" ? theaterName.toUpperCase() : theaterName} */}
                  <strong>{`${name}`}</strong> &nbsp;

                  <small>{theaterAddress}</small>   
                </Typography>

                {/* <small style={{ fontSize: "12px" }}>
                  "எங்களுக்கு வேறு எங்கும் கிளைகள் கிடையாது"{" "}
                  <strong style={{ fontSize: "16px" }}>
                    &nbsp; &nbsp; Masha allah
                  </strong>
                </small> */}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Divider
          sx={{ borderColor: "black", marginTop: "5px", marginBottom: "10px" }}
        />

        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body2" sx={{ color: "grey" }}>
              SEAT INFO
            </Typography>

            <Typography variant="body2" mt={1}>
              PRIME
            </Typography>

            {seatInfo !== null ? (
              <Stack direction="row" spacing={2}>
                {seatInfo?.map((a, index) => (
                  <Stack direction="row" gap={1} flexWrap={"wrap"} key={index}>
                    {a.map((a) => (
                      <Stack
                        sx={{
                          background: "#c29c09",
                          padding: "6px",
                          borderRadius: "7px",
                          color: "white",
                        }}
                      >
                        {a}
                      </Stack>
                    ))}
                  </Stack>
                ))}
              </Stack>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Divider
          sx={{ borderColor: "black", marginTop: "5px", marginBottom: "10px" }}
        />

        <Grid container flexDirection={"column"}>
          <Grid item>
            <Typography variant="body2" sx={{ color: "grey" }}>
              TICKETS
            </Typography>
          </Grid>

          <Grid item mb={3}>
            <Row>
              <Col>
                {slicedArray?.map((a) => a?.seats)}*
                {slicedArray?.map((a) => a?.amount)}.00
              </Col>
              <Col style={{ textAlign: "end" }}> &#8377;{amt}.00</Col>
            </Row>
          </Grid>
          {snackDetail && (
            <>
              <Typography variant="body2" sx={{ color: "grey" }}>
                SNACKS
              </Typography>
              <Row>
                <Col>{snackOutput}</Col>
                <Col style={{ textAlign: "end" }}>
                  {snackOutputWithTotalPrice}
                </Col>
              </Row>
            </>
          )}
          <Grid item mt={0} mb={0}>
            <Typography variant="body2" sx={{ color: "grey" }}>
              PAYMENT DETAILS
            </Typography>
            <Row>
              <Col>SubTotal</Col>
              <Col style={{ textAlign: "end" }}>
                {" "}
                &#8377;{amt + snackSelector}.00
              </Col>
            </Row>

            <Row>
              <Col>Taxes and fees</Col>
              <Col style={{ textAlign: "end" }}>
                &#8377;{(tax * slicedArray?.map((a) => a?.seats)).toFixed(2)}
              </Col>
            </Row>
          </Grid>
          <Divider
            sx={{
              borderColor: "black",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          />
        </Grid>

        <Grid container flexDirection={"column"}>
          <Grid item>
            <Row>
              <Col>GRAND TOTAL</Col>
              <Col style={{ textAlign: "end" }}>
                {" "}
                &#8377;
                {amt + grandTotalPrice + tax * slicedArray?.map((a) => a?.seats)}
              </Col>
            </Row>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieDetailComponent;
