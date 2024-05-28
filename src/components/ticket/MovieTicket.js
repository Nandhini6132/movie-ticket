import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import pepsi from "../../assets/pepsi.png";
import coke from "../../assets/coke.png";
import burger from "../../assets/burger-removebg-preview.png";
import pannerBurger from "../../assets/muttonBurger-removebg-preview.png";
import pizza from "../../assets/pizza-removebg-preview.png";
import tomatoPizza from "../../assets/cheeseTomatoPizza-removebg-preview.png";
import pannerSandwich from "../../assets/popcorn-removebg-preview.png";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
} from "firebase/firestore";
import { Box, Stack, Typography } from "@mui/material";
import {
  fetchMovieToGetDetails,
  getAmount,
  getSeatLength,
  getDate,
  getTime,
  getId,
  getSeatNo,
  getRowNo,
  removeRowAndSeat,
  getSnack,
  removeSnack,
  getOverAllTotal,
} from "../../slice/MovieSlice";
import { Increment, Decrement, setProducts } from "../../slice/CounterSlice";

import { Container, Form } from "react-bootstrap";
import MovieDetailComponent from "../../MovieDetailComponent";

const MovieTicket = ({
  user,
  value,
  handleLogin,
  handleGetDetail,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  handleVerifyPhone,
  selectedSeats,
  setSelectedSeats,
  // isDisabled,
  isPaymentConfirmed,
  rowNo,
  setRowNo,
  seatNo,
  setSeatNo,
  setMaritalStatus,
  setGender,
  gender,
  setDob,
  dob,
  maritalStatus,
}) => {
  const [combo, setCombo] = useState([]);
  const [addSnacks, setAddSnacks] = useState(false);
  const [displayQuantity, setDisplayQuantity] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);

  let price = 120;
  let tax = 4.36;

  const currentName = auth.currentUser;

  const date = new Date();
  const todayDate = date.getDate();
  const getMonth = date.getMonth();
  let month;
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
  let bookingDate;
  if (value === 0) {
    bookingDate = todayDate;
  } else if (value === 1) {
    bookingDate = todayDate + 1;
  } else {
    bookingDate = todayDate + 2;
  }

  const BookingDate = `${bookingDate}-${month}`;

  const { time } = useParams();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchMovieToGetDetails(id));
    dispatch(getDate(BookingDate));
    dispatch(getTime(time));
    dispatch(getId(id));
  }, []);

  const noOfSeats = selectedSeats
    .filter((seat) => seat.payment === false)
    .flatMap((a) => a.seat).length;


  const seatInfo = selectedSeats.filter((a) => a.payment === false);
  const comb = seatInfo.map((seat) => `${seat.rowNo}${seat.seatNo}`);

  const totalPrice = price * noOfSeats;

  const grandTotal = totalPrice + tax * noOfSeats;


  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true);

    dispatch(
      getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
    );
  };

  const handleClick = (event) => {
    dispatch(
      getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
    );
    setAddSnacks(true);
  };

  const [fbDocId, setFbDocId] = useState();

  const selector = useSelector((state) => state.allMovie.movieDetail.id);

  const documentId = `${BookingDate}-${id}-${time}`;
  const overAllSeats = [
    { id: 1, rowNo: "A", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 2, rowNo: "B", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 3, rowNo: "C", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 4, rowNo: "D", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 5, rowNo: "E", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 6, rowNo: "F", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 7, rowNo: "G", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { id: 8, rowNo: "H", seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },

  ];

  const handleToggle = async (rowNo, seatNo) => {
    if (user) {
      const seatId = `${time}*${id}*${todayDate}th${month}*seatNo${seatNo}`;
      const isSelected = selectedSeats.find(
        (seat) => seat.rowNo === rowNo && seat.seatNo === seatNo
      );
      dispatch(
        getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
      );

      if (isSelected) {
        dispatch(removeRowAndSeat());
        console.log(documentId, "idd");
        // await deleteDoc(doc(db, `${documentId}`, isSelected?.idDoc));
        setSelectedSeats((prevSeats) =>
          prevSeats.filter(
            (seat) => !(seat.rowNo === rowNo && seat.seatNo === seatNo)
          )
        );
      } else {
        dispatch(getSeatNo(seatNo));
        dispatch(getRowNo(rowNo));
        setRowNo((prev) => [...prev, { rowNo }]);
        setSeatNo((prev) => [...prev, { seatNo }]);

        // const ab = await addDoc(collection(db, `${documentId}`), {
        //   rowNo,
        //   seatNo,
        //   id: seatId,
        //   status: "selected",
        //   userId: currentName.uid,
        // });
        // console.log(ab, "hkjhjk");

        setSelectedSeats((prevSeats) => [
          ...prevSeats,
          {
            rowNo,
            seatNo,
            id: seatId,
            // idDoc: ab.id,
            status: "selected",
            userId: currentName.uid,
            isSeatConfirmed: "booked",
            payment: isPaymentConfirmed,
          },
        ]);
      }
    } else {
      console.log("pls login");
    }
  };

  useEffect(() => {
    dispatch(
      getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
    );
  }, [selectedSeats]);

  useEffect(() => {
    const checkIfDataExists = async () => {
      if (user) {

        const q = query(collection(db, `${documentId}`));

        const querySnapshot = await getDocs(q);


        let a = [];
        querySnapshot.forEach((doc) => {
          a.push({ idDoc: doc.id, ...doc.data() });
        });

        setSelectedSeats(a);
        setFbDocId(a.map((item) => item.idDoc));

      } else {
        console.log("no user");
      }
    };

    checkIfDataExists();
  }, [documentId, user]);

  console.log(selectedSeats.map((a) => a.seat).length);
  console.log(selectedSeats.flatMap((a) => a.seat).length);
  const [userData, setUserData] = useState();
  const [userDataExists, setUserDataExists] = useState(false);
  const userDocRef = doc(db, "users", auth.currentUser?.uid);

  useEffect(() => {
    const checkUserDocument = async () => {
      const userDocRef = doc(db, "users", auth.currentUser?.uid);
      const docSnap = await getDoc(userDocRef);
      setUserDataExists(docSnap.exists());
    };

    checkUserDocument();
  }, []);
  const saveData = async () => {
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserDataExists(true);

        await setDoc(userDocRef, {
          phoneNo: phone,
          gender: gender,
          maritalStatus: maritalStatus,
          name: name,
          email: email,
          // dob: dob,
        });
      } else {
        setUserDataExists(true);

        await setDoc(userDocRef, {
          phoneNo: phone,
          gender: gender,
          maritalStatus: maritalStatus,
          name: name,
          email: email,
          // dob: dob,
        });
      }
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const length = showDetailsSelector.length;
  const slicedArray = showDetailsSelector.slice(length - 1, length);
  const seatInfor = slicedArray?.map((a) => a.comb)?.map((seat) => seat);
  const amt =
    slicedArray.map((a) => a?.seats) * slicedArray.map((a) => a?.amount);

  const counterSelector = useSelector((state) => state.counter);
  let quantity;
  const snackDetailsss = useSelector(state => state.allMovie.snacksDetail)
  const snackDetail = snackDetailsss.filter(item => item.id !== undefined);
  const add = snackDetail?.map(a => a.snackPrice)
  console.log(add)
  const grandTotalPrice = add?.reduce((a, b) => a + b, 0);
 
  const addSnack = (a) => {
    setDisplayQuantity(true);
    let name = a.name;
    let price = a.price;
    let ida = a.id;
    quantity =
      snackDetailSelector
        ?.map((ab) => ab)
        .filter((snack) => snack.snackName === a.name).length + 1;
    console.log(quantity);
    dispatch(getSnack({ ida, name, price }));
    dispatch(getOverAllTotal(grandTotalPrice))

    setAddedProducts([...addedProducts, name]);
  };
  const snackDetailSelector = useSelector(
    (state) => state.allMovie.snacksDetail
  );
  const removeSnacks = (a) => {
    const ab = snackDetailSelector.filter((item) => item.id === a.id);

    const t = ab.splice(0, ab.length - 1);

    dispatch(removeSnack(a.id));
    dispatch(getOverAllTotal(grandTotalPrice))
  };

  useEffect(()=>{
    dispatch(getOverAllTotal(grandTotalPrice))
  },[addSnacks, removeSnacks])

  return (
    <>
      <Container fluid style={{ minHeightheight: "90vh", background: "white" }}>
        <Grid container>
          {!addSnacks ? (
            <Grid item md={8}>
              <div className="screen-container">
                <div className="screen"></div>
                <Box className="screenText">Screen</Box>
              </div>
              <div className="seatOrder">
                {overAllSeats.map((row, rowIndex) => (
                  <div key={row.id} className="div">
                    <div>{row.rowNo}</div>
                    {row.seats.map((seat, seatIndex) => (
                      <div
                        key={seat}
                        onClick={() => handleToggle(row.rowNo, seat)}
                      >
                        <button
                          id={`${id}*${todayDate}th${month}*seatNo${seat}`}
                          className={`h6 seat ticket ${selectedSeats.some(
                            (selSeat) =>
                              selSeat.rowNo === row.rowNo &&
                              selSeat.seatNo === seat
                          )
                              ? "selected"
                              : ""
                            }`}
                          disabled={selectedSeats.some((selSeat) => {
                            if (!Array.isArray(selSeat.rowNo)) return false;
                            return (
                              selSeat.rowNo.some(
                                (rowObj) => rowObj.rowNo === row.rowNo
                              ) &&
                              selSeat.seatNo.some(
                                (seatObj) => seatObj.seatNo === seat
                              ) &&
                              selSeat.payment === true
                            );
                          })}
                        >
                          {seat}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Stack direction="row" gap={7} justifyContent={"center"} mt={3}>
                {seatDetails.map((det, i) => (
                  <>
                    <Stack direction="row" gap={1}>
                      <div
                        style={{
                          height: "20px",
                          width: "20px",
                          backgroundColor: det.color,
                          borderRadius: "3px",
                        }}
                      ></div>
                      {det.value}
                    </Stack>
                  </>
                ))}
              </Stack>
              <p style={{ textAlign: "center" }} className="mt-3">
                Total No.of seats selected:{" "}
                {
                  selectedSeats
                    .filter((seat) => seat.payment === false)
                    .flatMap((a) => a.seat).length
                }
              </p>
              {console.log(userDataExists)}
              {userDataExists === true ? (
                <Stack width={"20%"} margin={"auto"}>
                  <Link
                    // to="/upiPage"
                    className="btn btn-warning"
                    onClick={handleClick}
                  >
                    Book Now Rs.
                    {amt + tax * slicedArray.map((a) => a?.seats)}
                  </Link>
                </Stack>
              ) : (
                <Stack width={"20%"} margin={"auto"}>
                  <button onClick={handleShow} className="btn btn-warning">
                    Book Now Rs.
                    {amt + tax * slicedArray.map((a) => a?.seats)}
                  </button>
                </Stack>
              )}
            </Grid>
          ) : (
            <>
              <Grid item md={8}>
                <Stack
                  display={"flex"}
                  gap={"30px"}
                  flexDirection={"row"}
                  flexWrap={"wrap"}
                  justifyContent={"center"}
                >
                  {snacks.map((a, i) => (
                    <Box
                      width={350}
                      height={260}
                      boxShadow={
                        " 2px 4px 0px 0px #e8e8e8, -3px -2px 0px -1px #e8e8e8"
                      }
                      mt={3}
                      borderRadius={"20px"}
                    >
                      <div style={{ height: "70%" }}>
                        <img
                          src={a.img}
                          alt={a.name}
                          width={150}
                          height={"100%"}
                          className="d-flex m-auto"
                        />
                      </div>
                      <Typography
                        ml={4}
                        variant="body1"
                        className="text-secondary fs-5"
                        fontWeight={500}
                      >
                        {a.name.toUpperCase()}
                      </Typography>

                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        ml={4}
                        mr={4}
                        alignItems={"center"}
                      >
                        <Typography>&#8377;{a.price}</Typography>
                        {addedProducts.includes(a.name) &&
                          snackDetailSelector
                            ?.map((ab) => ab)
                            .filter((snack) => snack.snackName === a.name)
                            .length > 0 ? (
                          <ButtonGroup
                            variant="contained"
                            aria-label="Basic button group"
                          >
                            <Button
                              onClick={() => removeSnacks(a)}
                              sx={{
                                "&.MuiButton-root": {
                                  backgroundColor: "#ffc107c9",
                                  color: "black",
                                },
                              }}
                            >
                              -
                            </Button>
                            <Button
                              disabled
                              sx={{
                                "&.Mui-disabled": {
                                  color: "white",
                                  backgroundColor: "#b8b8b8",
                                },
                              }}
                            >
                              {
                                snackDetailSelector
                                  ?.map((ab) => ab)
                                  .filter((snack) => snack.snackName === a.name)
                                  .length
                              }
                            </Button>
                            <Button
                              onClick={() => addSnack(a)}
                              sx={{
                                "&.MuiButton-root": {
                                  backgroundColor: "#ffc107c9",
                                  color: "black",
                                },
                              }}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        ) : (
                          <button
                            className="btn btn-warning"
                            onClick={() => addSnack(a)}
                            value={displayQuantity}
                          >
                            Add
                          </button>
                        )}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
                <Link to="/upiPage" className="d-block text-center mt-5">
                  <button className="btn btn-warning w-50">Proceed</button>
                </Link>
              </Grid>
            </>
          )}
          <Grid item md={4} width={"100%"}>
            <MovieDetailComponent />
          </Grid>
        </Grid>

        {!userDataExists && (
          <>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            // style={{width:'800px'}}
            >
              <Modal.Header closeButton>
                <Modal.Title>Let us know More about you!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="input">
                <>
                  {/* <Typography>Let us know more about you</Typography> */}
                  <button
                    onClick={handleGetDetail}
                    className="btn btn-warning mt-3 mb-3"
                  >
                    Get info from Google
                  </button>
                  <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control form-control-color"
                      id="name"
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email"> Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control form-control-color"
                      style={{ width: "90%" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control form-control-color"
                      style={{ width: "90%" }}
                    />
                    {/* <button className="btn btn-sm btn-warning" onClick={handleVerifyPhone}>verify</button> */}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="gender">Gender</label>
                    <div className="d-flex gap-4 mt-2">
                      {["Male", "Female", "Not to disclose"].map((option) => (
                        <div key={option} style={{ cursor: "pointer" }}>
                          <Form.Check
                            type="radio"
                            id={`gender-${option}`}
                            label={option}
                            name="gender"
                            value={option}
                            style={{ cursor: "pointer" }}
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <div className="d-flex gap-4 mt-2">
                      {["Single", "Married", "Unmarried"].map((option) => (
                        <div key={option}>
                          <Form.Check
                            type="radio"
                            id={`maritalStatus-${option}`}
                            label={option}
                            name="maritalStatus"
                            value={option}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={"/upiPage"}>
                    {" "}
                    <button
                      onClick={saveData}
                      className="btn btn-warning w-100"
                    >
                      Proceed
                    </button>
                  </Link>
                </>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Container>
    </>
  );
};

const seatDetails = [
  {
    value: "occupied",
    color: "#0532ffc9",
    disable: true,
  },
  {
    value: "available",
    color: "rgb(196 196 196)",
    disable: false,
  },
  {
    value: "selected",
    color: "#ffc107",
    disable: false,
  },
];

const snacks = [
  {
    id: 1,
    name: "Pepsi",
    img: pepsi,
    price: 120,
  },
  {
    id: 2,
    name: "Coke",
    img: coke,
    price: 180,
  },
  {
    id: 3,
    name: "cheese tomato pizza",
    img: tomatoPizza,
    price: 220,
  },
  {
    id: 4,
    name: "popcorn (large)",
    img: pannerSandwich,
    price: 270,
  },
  {
    id: 5,
    name: "popcorn (small)",
    img: pannerSandwich,
    price: 160,
  },
  // {
  //   name: "pizza",
  //   img: pizza,
  //   price: 320,
  // },
  {
    id: 6,
    name: "Burger",
    img: burger,
    price: 280,
  },
];
export default MovieTicket;
