import 'antd/dist/reset.css'
import '@style/styles.css'
import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loading, AuthGuard } from '@component'
import { Modal } from 'antd'
import {
    FormExample,
    ModalNotiExample,
    TableExample,
    TempPage,
    TempPage2,
    HowToUseRedux,
    HowToUseMessage,
    HowToUseNotification,
    HowToUseTable,
    Target,
    DanhSachSinhVien,
} from '@view'

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { seedingData } from '@service/userService'
import { seedingSinhVien } from '@service/sinhVienService'
import { seedingAdmin } from '@service/adminService'
dayjs.locale('vi')

const Login = React.lazy(() => import('@view/Login'))
const Register = React.lazy(() => import('@view/Register'))
const CPage = React.lazy(() => import('@view/CPage'))
const Dashboard = React.lazy(() => import('@view/Dashboard'))

function App() {
    seedingData()
    seedingAdmin()
    seedingSinhVien()
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route
                    exact
                    path='/login'
                    name='Trang đăng nhập'
                    element={<Login />}
                />
                <Route
                    exact
                    path='/register'
                    name='Trang đăng ký'
                    element={<Register />}
                />
                <Route
                    exact
                    path='/'
                    name='Trang chủ'
                    element={<Dashboard />}>
                    <Route
                        index
                        element={<Navigate to='/dssv' />}
                    />
                    <Route
                        path='/dssv'
                        name='DanhSachSinhVien'
                        element={<DanhSachSinhVien />}
                    />
                    <Route
                        path='/tempPage'
                        name='TempPage'
                        element={<TempPage />}
                    />
                    <Route
                        path='/tempPage2'
                        name='TempPage2'
                        element={<TempPage2 />}
                    />
                    <Route
                        path='/formExample'
                        name='FormExample'
                        element={<FormExample />}
                    />
                    <Route
                        path='/modalNotiExample'
                        name='ModalNotiExample'
                        element={<ModalNotiExample />}
                    />
                    <Route
                        path='/tableExample'
                        name='TableExample'
                        element={<TableExample />}
                    />
                    <Route
                        path='/howToUseRedux'
                        name='HowToUseRedux'
                        element={<HowToUseRedux />}
                    />
                    <Route
                        path='/howToUseMessage'
                        name='HowToUseMessage'
                        element={<HowToUseMessage />}
                    />
                    <Route
                        path='/howToUseNotification'
                        name='HowToUseNotification'
                        element={<HowToUseNotification />}
                    />
                    <Route
                        path='/howToUseTable'
                        name='HowToUseTable'
                        element={<HowToUseTable />}
                    />
                    <Route
                        path='/target'
                        name='Target'
                        element={<Target />}
                    />
                </Route>
                <Route
                    path='/cpage'
                    element={<CPage />}
                />
                <Route
                    path='*'
                    element={
                        <Navigate
                            to='/cpage'
                            state={{
                                status: 404,
                                title: 'Not Found',
                                subTitle: 'Trang bạn tìm kiếm không tồn tại',
                                goBackRoute: '/',
                                buttonTitle: 'Quay về trang chủ',
                            }}
                        />
                    }
                />
            </Routes>
        </Suspense>
    )
}

export default App
