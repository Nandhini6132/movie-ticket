import {configureStore} from '@reduxjs/toolkit'
import MovieSlice from '../slice/MovieSlice'
import CounterSlice from '../slice/CounterSlice'

export const store=configureStore({
    reducer:{
        allMovie:MovieSlice,
        counter:CounterSlice
    }
})