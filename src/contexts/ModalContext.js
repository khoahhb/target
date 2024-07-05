import React, { createContext, useState, useRef } from 'react'
import { Modal, Button } from 'antd'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
    const [modal, contextHolder] = Modal.useModal()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    const showModal = ({
        title = 'Modal title',
        content,
        onOk,
        onCancel,
        status,
        destroyOnClose = true,
        cancelText = 'Cancel',
        okText = 'Ok',
        confirmData = {},
        footer,
        style,
        centered,
        cancelButtonProps,
        okButtonProps,
        closeIcon,
        mask = true,
        maskClosable = false,
        closable = true,
        icon,
        width,
    } = {}) => {
        let props = {
            title,
            content,
            onOk,
            onCancel,
            status,
            cancelText,
            okText,
            confirmData,
            destroyOnClose,
            footer,
            style,
            centered,
            cancelButtonProps,
            okButtonProps,
            closeIcon,
            mask,
            maskClosable,
            closable,
            icon,
        }
        if (status !== null && status !== undefined) {
            modal[status]({
                //success, confirm, error, info, warning
                ...props,
                content: (
                    <>
                        {content?.map((e, i) => (
                            <div key={i}>
                                {e}
                                <br />
                            </div>
                        ))}
                    </>
                ),
            })
        } else {
            setData(props)
            setIsOpen(true)
        }
    }

    const closeModal = () => {
        setIsOpen(false)
        setIsLoading(false)
        setData({})
        modal.destroy()
    }

    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {contextHolder}
            <Modal
                open={isOpen}
                confirmLoading={isLoading}
                cancelText={data.cancelText}
                okText={data.okText}
                title={data.title}
                destroyOnClose={data.destroyOnClose}
                onOk={() => {
                    if (data.confirmData.isConfirm) {
                        setIsLoading(true)
                        if (data.confirmData.updateData)
                            setData({
                                ...data,
                                title: data.confirmData.updateData.title,
                                content: data.confirmData.updateData.content,
                            })
                    }
                    if (data.onOk) data.onOk()

                    if (data.confirmData.isConfirm) {
                        setTimeout(() => {
                            setIsLoading(false)
                            setIsOpen(false)
                        }, 1500)
                    } else {
                        setIsOpen(false)
                    }
                }}
                onCancel={() => {
                    if (data.onCancel) data.onCancel()
                    setIsOpen(false)
                }}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        {data.footer &&
                            data.footer.lenght > 0 &&
                            data.footer.map(
                                (CustomButton, index) => CustomButton
                            )}
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
                style={data.style}
                centered={data.centered}
                okButtonProps={data.okButtonProps}
                cancelButtonProps={data.cancelButtonProps}
                closeIcon={data.closeIcon}
                keyboard={true}
                mask={data.mask}
                maskClosable={data.maskClosable}
                icon={data.icon}
                width={data.width}
            >
                {data.content?.map((e, i) => (
                    <div key={i}>
                        {e}
                        <br />
                    </div>
                ))}
            </Modal>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }
