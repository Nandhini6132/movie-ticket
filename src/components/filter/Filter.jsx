import React, { useState } from 'react'
import '../filter/filter.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovies } from '../../slice/MovieSlice'

import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const Filter = () => {

    const filterSelector = useSelector(state => state.allMovie.movie)
    let g_id = Array.isArray(filterSelector) && filterSelector?.map(a => a.genre_ids)?.map(a => a[0]) || []
    const [genre, setGenre] = useState('')
    const dispatch = useDispatch()

    let g_name;


    switch (g_id) {
        case 28:
            g_name = "action"
            break;
        case 12:
            g_name = "adventure"
            break;
        case 16:
            g_name = "animation"
            break;
        case 35:
            g_name = "comedy"
            break;
        case 80:
            g_name = "crime"
            break;
        case 99:
            g_name = "documentary"
            break;
        case 18:
            g_name = "drama"
            break;
        case 10751:
            g_name = "family"
            break;
        case 14:
            g_name = "fantasy"
            break;
        case 36:
            g_name = "history"
            break;
        case 27:
            g_name = "horror"
            break;
        case 10402:
    }
    const handleFilter = (btn) => {
        try {
            setGenre(btn.btn);
            let ab;
            if (Array.isArray(filterSelector)) {

                ab = filterSelector.find(a => a.genre_ids.includes(btn.id));

            } else {
                toast.error('No results for your filter', {
                    position: "top-center",

                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
            }

            dispatch(fetchAllMovies(ab?.id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleReset = () => {
        setGenre('')
        dispatch(fetchAllMovies())
    }


    return (
        <div className='filter'>
            <ToastContainer />
            <h3>Filters</h3>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h5 className='text-danger fw-normal'>Genres</h5>
                </AccordionSummary>
                <AccordionDetails className='d-flex flex-wrap gap-3'>
                    {filter?.map(btn => {
                        return <button className='btn btn-outline-warning   ' onClick={() => handleFilter(btn)}>{btn.btn}</button>
                    })}
                    <button className="btn" onClick={handleReset}>Clear</button>
                </AccordionDetails>
            </Accordion>
            <div className='mt-5'><Link className='text-decoration-none linkbtn text-danger ' to={'/browsebytheater'}><button className="btn btn-outline-danger browTheater w-100">Browse by theater</button></Link></div>

        </div>
    )
}

const filter = [{ btn: 'action', id: 28 },
{ btn: 'fantasy', id: 10751 },
{ btn: 'drama', id: 18 },
{ btn: 'comedy', id: 35 }, { btn: 'horror', id: 27 }

]

export default Filter