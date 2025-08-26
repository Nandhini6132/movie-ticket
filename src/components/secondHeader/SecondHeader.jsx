

import React from 'react'
import { Container, NavItem, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SecondHeader = () => {
    return (
        <Navbar style={{borderBottom:'0.5px solid #d7d7d7', padding:'12px 0'}}>
            <Container>
                <NavItem className='d-flex gap-4'>
                    <Link to={'/'} className='text-decoration-none fw-normal text-black'>Movies</Link>
                    <Link to={'/upcoming'} className='text-decoration-none fw-normal text-black'>Upcoming Movies</Link>
                    <Link to={'/'} className='text-decoration-none fw-normal text-black'>Series</Link>

                    <Link to={'/'} className='text-decoration-none fw-normal text-black'>Events</Link>

                    <Link to={'/'} className='text-decoration-none fw-normal text-black'>Activites</Link>
                    <Link to={'/booksmile'} className='text-decoration-none fw-normal text-black'>Book a smile</Link>

                </NavItem>

            </Container>
        </Navbar>
    )
}

export default SecondHeader