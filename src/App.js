import { useState, useEffect } from "react";
import Header from "./components/header/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import Tmdb from "../src/Tmdb";
import MovieListing from "./components/movies/MovieListing";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import MovieSessions from "./components/moviesessions/MovieSessions";
import MovieTicket from "./components/ticket/MovieTicket";
import { PhoneAuthProvider } from "firebase/auth";
import UpiPage from "./UpiPage";
import {
  signInWithPopup,
  signInWithPhoneNumber,
  signInWithCredential,
} from "firebase/auth";
import { auth, provider } from "./firebase/firebase";
import Booking from "./components/booking/Booking";
import Profile from "./components/profile/Profile";
import PersonalDetail from "./components/profile/PersonalDetail";
import MyBookings from "./components/profile/MyBookings";
import { useDispatch } from "react-redux";
import { fetchCastAndCrew, fetchMovieToGetDetails } from "./slice/MovieSlice";
import AddSnacks from "./components/food/AddSnacks";
import Movies2020 from "../src/Tmdb";
import SecondHeader from "./components/secondHeader/SecondHeader";
import UpcomingMovies from "./components/upcoming/UpcomingMovies";
import BrowseByTheater from "./components/browseByTheaters";
import Footer from "./components/footer/Footer";
import BookSmile from "./components/bookSmile";
import DebitPage from "./paymentPage/DebitPage";


function App() {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [rowNo, setRowNo] = useState([]);
  const [seatNo, setSeatNo] = useState([]);
  console.log(user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user.displayName);
      else setUser(null);
    });
  }, []);
  const handleLogin = async () => {
    const name = await signInWithPopup(auth, provider);
    console.log(auth.currentUser.displayName);
    // setUser(auth.currentUser.displayName)
  };

  const handleLogOut = async () => {
    await auth.signOut();
  };
  const handleChange = (event, newValue) => {
    console.log(newValue, "new");
    setValue(newValue);
  };
  const handleGetDetail = () => {
    console.log(auth.currentUser);
    setName(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
  };
  const handleVerifyPhone = async () => {
    const phoneNumber = "+6374876300";
    try {
      const verificationId = await signInWithPhoneNumber(auth, phoneNumber);
      console.log("Phone number verification initiated");

      const otp = window.prompt("Enter OTP");

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);

      console.log("Phone number verified successfully");
    } catch (error) {
      console.error("Phone authentication error:", error);
    }
  };
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const toogleOpen = async (id) => {
    setDrawer(true);
    dispatch(fetchCastAndCrew(id));
    dispatch(fetchMovieToGetDetails(id));
  };
  const toogleClose = () => {
    setDrawer(false);
  };
  const [location, setLocation] = useState(null)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //theater opts 
  const theater = [
    {
      name: 'Vellore',
      theaterName: [
        {
          id: "pvr-vellore",
          name: "PVR: Velocity - Katpadi",
          address:"Silk Mill, Gandhi nagar, Vellore",
          number: 1
  
        },
  
        {
          id: 'inox-vellore',
          name: "INOX: Vellore",
          address:"No.52,Officers line, Selvam Square, Vellore",
          number: 2
        },
      ]
    },
  
    {
      name: 'Chennai',
      theaterName: [
        {
          id: "pvr-chennai",
          name: "PVR: Chennai",
          address:'8 Thiru Vi Ka Road, Peters Colony, Royapettah Royapettah, Chennai (Madras) 600014 India',
          number: 1
  
        },
        {
          id:'Luxe-Cinemas',
          name:'Luxe: Chennai',
          address:"2nd Floor, Phoenix Market City Velachery Main Road, Chennai (Madras) 600042 India",
          number:3
        }
      ]
    },
  
  
    {
      name: 'Banglore',
      theaterName: [
        {
          id: 'Cinepolis-banglore',
          name: 'Cinepolis Banglore',
          address:'40, Siddaiah Rd Near MTR, Doddamavalli, Bengaluru 560002 India',
          number: 1
        },
        {
          id: 'Innovative-banglore',
          name: 'Innovative : Bangalore',
          address:'56, East Tank Bund Road, Gandhi Nagar, Bengaluru 560009 India',
          number: 2
        },
        {
          id: 'pvr-banglore',
          name: 'PVR-Max: Banglore',
          address:'Whitefield Main Road 3rd, VR Mall, 408 3rd Cross, Singayana Palya, Mahadevpura, Bengaluru 560048 India',
          number: 3
        }
      ]
    },
  
    {
      name: 'Hyderabad',
      theaterName: [
        {
          id: 'Prasads-hyd',
          name: 'Prasads: Hyderabad',
          address:'Gachibowli Rd Survey #40, Kothaguda Junction, Inside Sarath City Capital Mall, Hyderabad 500084 India',
          number: 1
        },
        {
          id: 'amb-hyd',
          name: 'AMB Cinemas: Hyderabad ',
          address:'Next Galeria Mall Survey No 64, 4th Floor Madhapur, Hitech City,, Hyderabad 500081 India',
          number: 2
        }
      ]
    },
  
    {
      name: 'Mumbai',
      theaterName: [
        {
          id: 'Maratha-mumbai',
          name: 'Maratha Mandir: Mumbai',
          address:'22 Maratha Mandir Marg Agripada, Mumbai 400008 India',
          number: 1
        },
        {
          id: 'Premier-mumbai',
          name: 'Premier Gold Cinema: Mumbai',
          address:'Liberty Building, 41/42, Churchgate, Mumbai 400020 India',
          number: 2
        },
        {
          id: 'Plaza-mumbai',
          name: 'Plaza: Mumbai',
          address:'Dutta Mandir Road Malad East, Mumbai 400097 India',
          number: 3
        }
      ]
    },
  
    {
      name: 'Delhi',
      theaterName: [
        {
          id: 'INOX-delhi',
          name: 'INOX: Delhi',
          address:'INOX Leisure Ltd.,45, District Centre, Near Intercontinental Hotel, Nehru Place,New Delhi - 110019, New Delhi 110019 India',
          number: 1
        },
        {
          id: 'Cinépolis-delhi',
          name: 'Cinépolis:  Delhi',
          address:'265 Bhagawan Mahavir Marg Pocket 17, Sector 7H, New Delhi 110085 India',
          number: 2
        },
        {
          id: 'Deilte-delhi',
          name: ' Delite Dimond Cinema : Delhi',
          address:'Grand Trunk Road Vikas Cine Mall - 813/2 G.T, 2nd Floor, Opp Shahdra Metro Station, Shahdara, New Delhi 110002 India',
          number: 3
        }
      ]
    }
  
  
  ]


  return (
    <div className="App">
      <header>
      <Header
        handleLogin={handleLogin}
        setUser={setUser}
        user={user}
        handleLogOut={handleLogOut}
        location={location}
        setLocation={setLocation}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
      <SecondHeader />
      </header>


     
        {/* browse by theaters */}
       <main>
       <Routes>
       <Route path='/browsebytheater' element={<BrowseByTheater theater={theater} location={location}/>}/>
        <Route
          path="/"
          index
          element={<Home user={user} handleLogin={handleLogin} location={location} />}
        />
        {/* upcoming movies */}

        <Route path='/upcoming' element={<UpcomingMovies />} />
        <Route
          path="/moviesessions/:id"
          index
          element={
            <MovieSessions
              handleChange={handleChange}
              value={value}
              toogleOpen={toogleOpen}
              toggleClose={toogleClose}
              location={location}
              handleOpen={handleOpen}
              theater={theater}
            />
          }
        />
        <Route
          path="/moviesessions/:id/:theater/ticket/:time"
          element={
            <MovieTicket
              user={user}
              value={value}
              handleLogin={handleLogin}
              handleGetDetail={handleGetDetail}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              handleVerifyPhone={handleVerifyPhone}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              isPaymentConfirmed={isPaymentConfirmed}
              setIsPaymentConfirmed={setIsPaymentConfirmed}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              rowNo={rowNo}
              setRowNo={setRowNo}
              seatNo={seatNo}
              setSeatNo={setSeatNo}
              setMaritalStatus={setMaritalStatus}
              setGender={setGender}
              gender={gender}
              setDob={setDob}
              dob={dob}
              maritalStatus={maritalStatus}
              location={location}
              theater={theater}
            />
          }
        />
        <Route
          path="/:id/:time/booking"
          element={<Booking value={value} user={user} />}
        />
        <Route
          path="/upiPage"
          element={
            <UpiPage
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              user={user}
              isPaymentConfirmed={isPaymentConfirmed}
              setIsPaymentConfirmed={setIsPaymentConfirmed}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              rowNo={rowNo}
              setRowNo={setRowNo}
              seatNo={seatNo}
              setSeatNo={setSeatNo}
            />
          }
        />
        <Route path="/debitcard" element={<DebitPage/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/personalDetail"
          element={<PersonalDetail handleLogOut={handleLogOut} />}
        />
        <Route
          path="/personalDetail/myBooking"
          element={<MyBookings user={user} selectedSeats={selectedSeats} />}
        />
        <Route path="/addsnacks" element={<AddSnacks />} />
        <Route path='/booksmile' element={<BookSmile />} />
      </Routes>
       </main>
       <Footer/>
    </div>
  );
}

export default App;
