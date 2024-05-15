import React,{useEffect} from 'react'
import { Container } from 'react-bootstrap'
import '../home/Home.css'
import axios from 'axios'
import MovieListing from '../movies/MovieListing';
import Carousel from 'react-bootstrap/Carousel';
import Poster from '../../assets/poster1.jpg'
import Poster2 from '../../assets/poster2.jpg'
import Poster3 from '../../assets/poster3.jpg'
import Poster4 from '../../assets/poster4.webp'
import Poster5 from '../../assets/poster5.jpg'



const Home = ({user, handleLogin}) => {

  return (
    <>
     <Container fluid className='mt-2 p-0'>
     <Carousel fade>
      <Carousel.Item>
        {/* <Poster text="First slide" /> */}
        <img src={Poster} alt="" width={'100%'} height={'450px'}/>
   
      </Carousel.Item>
      <Carousel.Item>
        {/* <Poster text="Second slide" /> */}
        <img src={Poster2} alt="" width={'100%'} height={'450px'}/>
        
      </Carousel.Item>
      <Carousel.Item>
        {/* <Poster text="Third slide" /> */}
      <img src={Poster3} alt="" width={'100%'} height={'450px'}/>
      </Carousel.Item>

      <Carousel.Item>
        {/* <Poster text="Third slide" /> */}
      <img src={Poster4} alt="" width={'100%'} height={'450px'}/>
      </Carousel.Item>

      <Carousel.Item>
        {/* <Poster text="Third slide" /> */}
      <img src={Poster5} alt="" width={'100%'} height={'450px'}/>
      </Carousel.Item>


    </Carousel>
        {/* <div className='bg-img'></div> */}
        <MovieListing user={user} handleLogin={handleLogin}/>
     </Container>
    </>
  )
}

export default Home