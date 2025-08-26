import React, {useState} from "react";
import { Box, InputAdornment, Paper, Typography } from "@mui/material";
import PaymentOptions from "../PaymentOptions";
import MovieDetailComponent from "../MovieDetailComponent";
import { useSelector } from "react-redux";

const DebitPage = () => {
  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const length = showDetailsSelector.length;
  const slicedArray = showDetailsSelector.slice(length - 1, length);
  const snackSelector = useSelector((state) => state.allMovie.overAllTotal);
//   const [cardNumber, setCardNumber] = useState('');

//   const handleCardNumberChange = (e) => {
//     let value = e.target.value.replace(/\D/g, ''); 
//     if (value.length > 16) {
//       value = value.slice(0, 16); 

   
//     const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();

//     setCardNumber(formattedValue);
//   };
  return (
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
          <Typography>
            {slicedArray?.map((a) => a.grandTotal + snackSelector)}
          </Typography>
        </Paper>

        <Paper className="ps-3"
          sx={{
            padding: "10px",
            // display: "flex",
            marginTop: "60px",
          }}
        >
          <Typography className="">Card Details</Typography>
          <div className="mt-3">
            {" "}
            <input
              type="number"
              placeholder="Enter your 16digit card number"
              style={{ width: "80%" , padding:'8px 20px', outline: 'none', fontSize:'25px' }}
            //   value={cardNumber}
            //   onChange={handleCardNumberChange}
            />
          </div>
        </Paper>
      </Box>

      <MovieDetailComponent />
    </Box>
  );
};

export default DebitPage;
