import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    loading: false,
}

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true
        },
        fetchDataSuccess(state, action) {
            state.loading = false
            state.data = action.payload
        },
        fetchDataFailure(state) {
            state.loading = false
        },
    },
})

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
    exampleSlice.actions

export default exampleSlice.reducer
