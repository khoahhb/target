import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoonOutlined,
    SunOutlined,
    UserOutlined,
    LogoutOutlined,
    MoreOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { Button, Layout, Tooltip, Image, Popover, Input } from 'antd'
import { useTheme, useAuth, useModal, useNotification } from '@hook'
import { UrlImage } from '@asset/Images'

const { Header } = Layout

const AppHeader = (props) => {
    const { CStyles, token, navigate, location } = props.rootprops
    const localStyle = CStyles.Dashboard
    const themeMode = useTheme()
    const { showModal } = useModal()
    const { signOut } = useAuth()
    const { showNotification } = useNotification()

    const [openUserMenu, setOpenUserMenu] = useState(false)

    const handleOpenUserMenuChange = (newOpen) => {
        setOpenUserMenu(newOpen)
    }

    const handleLogout = () => {
        showModal({
            status: 'confirm',
            title: 'Xác nhận đăng xuất!',
            content: ['Bạn có thật sự muốn đăng xuất không?'],
            cancelText: 'Hủy',
            okText: 'Đăng xuất',
            onOk: async () => {
                await signOut()
                showNotification(
                    'info',
                    `Đăng xuất thành công`,
                    'Bạn sẽ được chuyển để trang đăng nhập!'
                )
                navigate('/login')
            },
        })
    }

    return (
        <Header style={localStyle.header}>
            <Tooltip
                title={props.collapsed ? 'Mở menu' : 'Đóng menu'}
                placement='bottom'
            >
                <Button
                    type='text'
                    icon={
                        props.collapsed ? (
                            <MenuUnfoldOutlined style={{ fontSize: 22 }} />
                        ) : (
                            <MenuFoldOutlined style={{ fontSize: 22 }} />
                        )
                    }
                    onClick={() => props.setCollapsed(!props.collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
            </Tooltip>

            <div style={localStyle.headerCol3}>
                <Tooltip
                    title={
                        token.isDarkMode ? 'Giao diện sáng' : 'Giao diện tối'
                    }
                    placement='bottom'
                    mouseEnterDelay={0.2}
                >
                    {token.isDarkMode ? (
                        <SunOutlined
                            style={{ fontSize: 22, marginRight: 16 }}
                            onClick={() => themeMode.toggleColorMode()}
                        />
                    ) : (
                        <MoonOutlined
                            style={{ fontSize: 22, marginRight: 16 }}
                            onClick={() => themeMode.toggleColorMode()}
                        />
                    )}
                </Tooltip>
                <Popover
                    placement='bottomLeft'
                    trigger='click'
                    content={
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Button
                                type='text'
                                icon={<UserOutlined style={{}} />}
                                style={{
                                    justifyContent: 'flex-start',
                                    textAlign: 'left',
                                    borderRadius: 0,
                                }}
                            >
                                Thông tin chung
                            </Button>
                            <Button
                                type='text'
                                icon={<LogoutOutlined />}
                                style={{
                                    justifyContent: 'flex-start',
                                    textAlign: 'left',
                                    borderRadius: 0,
                                }}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    }
                    open={openUserMenu}
                    onOpenChange={handleOpenUserMenuChange}
                >
                    <Image
                        src={UrlImage.UserAvatar}
                        style={{
                            cursor: 'pointer',
                            verticalAlign: 'inherit',
                        }}
                        preview={false}
                        width={40}
                        height={40}
                    />
                </Popover>
            </div>
        </Header>
    )
}

export default AppHeader
