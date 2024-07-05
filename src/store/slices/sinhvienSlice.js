import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

const sinhvienSlice = createSlice({
    name: 'sinhvien',
    initialState,
    reducers: {
        setSinhvienRedux(state, action) {
            state.data = action.payload
        },
        getSinhvienRedux(state) {
            return state.data
        },
    },
})

export const { setSinhvienRedux, getSinhvienRedux } = sinhvienSlice.actions

export default sinhvienSlice.reducer
