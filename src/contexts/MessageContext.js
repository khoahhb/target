import React, { createContext, useContext } from 'react'
import { message } from 'antd'
// Cấu hình global cho message
message.config({
    top: 20, // Vị trí hiển thị từ trên cùng (px)
    duration: 2, // Thời gian hiển thị mặc định (giây)
    maxCount: 3, // Số lượng thông điệp tối đa hiển thị cùng lúc
    rtl: false, // Hỗ trợ chế độ từ phải sang trái
})

const MessageContext = createContext()

const MessageProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage()

    const showMessage = (type, content, duration = 3, options = {}) => {
        return messageApi.open({
            type,
            content,
            duration,
            ...options,
        })
    }

    const closeMessage = (key) => {
        messageApi.destroy(key)
    }

    return (
        <MessageContext.Provider value={{ showMessage, closeMessage }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProvider }
