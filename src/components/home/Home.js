import React,{useEffect} from 'react'
import { Container } from 'react-bootstrap'
import '../home/Home.css'
import axios from 'axios'
import MovieListing from '../movies/MovieListing';



const Home = ({user, handleLogin}) => {

  return (
    <>
     <Container fluid className='mt-2 p-0'>
        <div className='bg-img'></div>
        <MovieListing user={user} handleLogin={handleLogin}/>
     </Container>
    </>
  )
}

export default Home