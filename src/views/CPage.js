import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

const CPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { status, title, subTitle, goBackRoute, buttonTitle } =
        location.state || {
            status: '404',
            title: 'Not Found',
            subTitle: 'Trang bạn tìm kiếm không tồn tại',
            goBackRoute: '/',
            buttonTitle: 'Quay về trang chủ',
        }

    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={
                <Button
                    onClick={() => navigate(goBackRoute)}
                    type='primary'
                >
                    {buttonTitle}
                </Button>
            }
        />
    )
}

export default CPage
