import {createSlice}  from '@reduxjs/toolkit'

const initialState=0
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers :{
      Increment : (state) => {
        
        if (state + 1 > 5) {
          alert('it should not exceed 5')
          return 5;
        } else {
          
          return state + 1;
        }
      } ,
        Decrement:(state,action)=>{
          if(state-1<0){
            return 0
          }
          else
          return state-1
        }
    }
})

export const {Increment, Decrement, setProducts} = counterSlice.actions
export default counterSlice.reducer