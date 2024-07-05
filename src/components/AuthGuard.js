import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hook'
import Loading from './Loading'

const AuthGuard = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth()

    if (!isInitialized) return <Loading />

    if (!isAuthenticated) {
        return (
            <Navigate
                to='/cpage'
                state={{
                    status: 403,
                    title: 'Unauthorized',
                    subTitle: 'Bạn không có quyền truy cập vào trang này',
                    goBackRoute: '/login',
                    buttonTitle: 'Đăng nhập',
                }}
                replace
            />
        )
    }

    return children
}

export default AuthGuard
