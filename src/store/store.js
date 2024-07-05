import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'
import sinhvienReducer from './slices/sinhvienSlice'
import adminReducer from './slices/adminSlice'

const store = configureStore({
    reducer: {
        example: exampleReducer,
        sinhvien: sinhvienReducer,
        admins: adminReducer,
    },
})

export default store
