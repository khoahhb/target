import React, { createContext, useContext, useMemo } from 'react'
import { notification } from 'antd'

// Cấu hình global cho notification
notification.config({
    placement: 'topRight', // Vị trí hiển thị mặc định
    top: 50, // Khoảng cách từ trên cùng (px)
    duration: 3, // Thời gian hiển thị mặc định (giây)
})

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification()

    const showNotification = (type, message, description, options = {}) => {
        return api[type]({
            message,
            description,
            ...options,
        })
    }

    const closeNotification = (key) => {
        api.destroy(key)
    }

    const contextValue = useMemo(
        () => ({
            showNotification,
            closeNotification,
            contextHolder,
        }),
        [api]
    )

    return (
        <NotificationContext.Provider value={contextValue}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationContext, NotificationProvider }
