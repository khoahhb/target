// adminSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

const adminSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        setAdmins(state, action) {
            state.data = action.payload
        },
        getAdmins(state) {
            return state.data
        },
    },
})

export const { setAdmins, getAdmins } = adminSlice.actions

export default adminSlice.reducer
