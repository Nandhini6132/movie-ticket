import React from 'react'
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const MovieBannerComponent = ({movieselector, hours,minutes,formattedDate,toogleOpen,id}) => {
  return (
    <Box>
    <div
      className="moviesessionBg"
      style={{
        backgroundImage: `linear-gradient(to right, rgb(0 59 255 / 51%), rgb(22 43 63 / 58%)), url(https://image.tmdb.org/t/p/original/${movieselector?.backdrop_path})`,
        height: "420px",
        backgroundPosition: "center",
      }}
    >
      <Box className="h-100" ml={25} mr={25}>
        <div className="d-flex" style={{ height: "100%" }}>
          <div className="d-flex align-items-center ">
            <img
              className=""
              src={`https://image.tmdb.org/t/p/original/${movieselector?.poster_path})`}
              alt=""
              width={200}
              height={350}
              style={{ borderRadius: "10px" }}
            />
          </div>

          <Stack ml={30} mt={5} sx={{ color: "white" }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {movieselector?.original_title}
            </Typography>
            <Stack direction={"row"}>
              {" "}
              U
              <ul
                className="d-flex gap-5"
                style={{ listStyleType: "disc" }}
              >
                <li>{`${hours}h ${minutes}min`}</li>
                <li>{formattedDate}</li>
                <li>
                  {" "}
                  <li className="d-flex gap-2">
                    {movieselector?.genres?.map((a) => (
                      <p>{a.name}</p>
                    ))}
                  </li>
                </li>
                <li>English</li>
              </ul>
            </Stack>

            <Stack className="mt-5">
              <Typography className="mt-2">
                {movieselector?.overview}
              </Typography>
            </Stack>

            <a
              href="#"
              onClick={() => toogleOpen(id)}
              style={{ color: "white" }}
              className="mt-4"
            >
              View Details
            </a>
          </Stack>
        </div>
      </Box>
    </div>
  </Box>
  )
}

export default MovieBannerComponent