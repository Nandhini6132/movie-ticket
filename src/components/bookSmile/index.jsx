import React from 'react'
import bookSmile from '../../assets/bookSmile.avif'
import '../bookSmile/index.css'

const BookSmile = () => {
  return (
      <div>
        <div>
            <div style={{height:'87vh', width:'100%'}} className='bookSmileBg'>
                 <div className='container h-75 d-flex align-items-center'>
                    <h3 style={{fontFamily:'fantasy', letterSpacing:'2px', color:'white'}}>b☺☺k &nbsp;  <span>a</span> smile</h3>
                 </div>
            </div>
        </div>
      </div>
  )
}

export default BookSmile