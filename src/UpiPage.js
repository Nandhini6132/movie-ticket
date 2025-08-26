import React, { useState } from "react";
import { Box, InputAdornment, Paper, Typography } from "@mui/material";
import PaymentOptions from "./PaymentOptions";
import MovieDetailComponent from "./MovieDetailComponent";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import MovieTicketPdf from "./components/invoice/MovieTicketPdf";
import { clearAllDetails } from "./slice/MovieSlice";

const UpiPage = ({
  selectedSeats,
  setSelectedSeats,
  isPaymentConfirmed,
  setIsPaymentConfirmed,
  isDisabled,
  setIsDisabled,
  rowNo,
  seatNo,
}) => {
  console.log(selectedSeats, "kklkkl");
  const seatInfo = selectedSeats?.filter(
    (seat) => seat.userId === auth.currentUser?.uid
  );
  const comb = seatInfo.map((seat) => `${seat.rowNo}${seat.seatNo}`);
  console.log(comb);
  const fbSelector = useSelector((state) => state.allMovie);
  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const length = showDetailsSelector.length;
  const slicedArray = showDetailsSelector.slice(length - 1, length);
  console.log(slicedArray);

  const seatId = `${fbSelector?.time}*${fbSelector?.id}*${fbSelector?.date}*seatNo${comb}`;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [fstore, setFStore] = useState();
  const [bookingSum, setBookingSum] = useState();
  const selector = useSelector((state) => state.allMovie);
  const snackSelector= useSelector(state=>state.allMovie.overAllTotal)
  const theater= useSelector(state=>state.allMovie.theaterName)
  const locationSelector= useSelector(state=>state.allMovie.location)

  const dispatch = useDispatch()
 

  const handleClickOpen = async () => {
    setIsPaymentConfirmed(true);
    setIsDisabled(true);
    dispatch(clearAllDetails())
    navigate('/')
  
    const documentId = `${locationSelector}-${theater}-${fbSelector.date}-${fbSelector.id}-${fbSelector.time}`

    try {
      const ab = await addDoc(collection(db, `${documentId}`), {
        seat: comb,
        id: seatId,
        status: "selected",
        isSeatConfirmed: "booked",
        userId: auth?.currentUser?.uid,
        rowNo: rowNo,
        seatNo: seatNo,
        payment: true,
        movieId: selector.id,
        time: selector.time,
        date: selector.date,
        title: selector.movieDetail ? selector.movieDetail.original_title : "",
        theater:theater,
        location:locationSelector
        
      });

      const bookingSummary = await addDoc(
        collection(db, auth?.currentUser?.uid),
        {
          movieId: selector.id,
          time: selector.time,
          date: selector.date,
          title: selector.movieDetail
            ? selector.movieDetail.original_title
            : "",
          seat: comb,
          theater:theater,
          location:locationSelector
        }
      );
      setBookingSum(bookingSummary);

      setFStore(ab);

      setOpen(true);
      setIsPaymentConfirmed(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  console.log(setFStore, "bbb");

  const handleClose = () => {
    setOpen(false);
    setIsPaymentConfirmed(false);
    navigate("/");
  };
  const handleOpenTicket = () => {
    setModalShow(true);
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <PaymentOptions />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} width={"200%"}>
          <Paper
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Amount to be paid </Typography>
            <Typography>{slicedArray?.map((a) => a.grandTotal + snackSelector)}</Typography>
          </Paper>

          <Paper sx={{ marginTop: "50px" }}>
            <Box
              sx={{
                width: "100%",
                padding: "60px 20px",
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="UPI id"
                id="fullWidth"
                placeholder="Enter your upi id"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">@paytm</InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>

          <button
            className="btn btn-warning w-100 mt-5"
            onClick={handleClickOpen}
          >
            Pay {(slicedArray?.map((a) => a.grandTotal + snackSelector))}
          </button>

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Payment Successful"}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Go to home page
              </Button>
              <Button variant="secondary" onClick={() => handleOpenTicket()}>
                View Ticket
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <MovieTicketPdf show={modalShow} onHide={() => setModalShow(false)} />
        <MovieDetailComponent />
      </Box>
    </>
  );
};

export default UpiPage;
