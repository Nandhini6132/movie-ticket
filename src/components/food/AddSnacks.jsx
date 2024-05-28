import React from 'react'
import Grid from "@mui/material/Grid";
import MovieDetailComponent from '../../MovieDetailComponent';

const AddSnacks = () => {
  return (
    <>
     <Grid container>
        <Grid item md={8}></Grid>
        <Grid item md={4}>
            <MovieDetailComponent/>
        </Grid>
     </Grid>
    </>
  )
}

export default AddSnacks