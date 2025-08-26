import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Footer from '../footer/Footer'

const BrowseByTheater = ({ theater, location }) => {

  const [storedTheater, setStoredTheater] = useState(null)
  useEffect(() => {
    if (location) {
      setStoredTheater(theater.filter(a => a.name === location))
    }
    else {
      setStoredTheater(theater)
    }
  }, [location, theater])

  return (
    <>
      <div className="container mt-5">
        <div className='d-flex flex-wrap gap-5' style={{ height: '' }}>
          {storedTheater?.map(theater => {
            return (
              <>
                {theater.theaterName.map(a => {
                  return (<>
                    <Card style={{ width: '400px' }}>
                      <Card.Body>

                        <Card.Title>{a.name}</Card.Title>


                        <Card.Text>
                          {a.address}
                        </Card.Text>

                      </Card.Body>
                    </Card></>)
                })}
              </>
            )
          })}
        </div>
      </div>
    
    </>
  )
}

export default BrowseByTheater