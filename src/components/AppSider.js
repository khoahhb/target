import React, { useEffect, useState, useMemo } from 'react'
import { Layout, Menu, Tooltip, Image } from 'antd'
import { UrlImage } from '@asset/Images'
import datatest from '@asset/Datatest'
import Icon from '@component/Icon'

const { Sider } = Layout

const AppSider = (props) => {
    const { CStyles, token, navigate, location } = props.rootprops
    const localStyle = CStyles.Dashboard

    const [openKeys, setOpenKeys] = useState([])
    const selectedKeys = useMemo(() => location.pathname, [location.pathname])

    const findParentKey = (menuData, selectedKey) => {
        for (let item of menuData) {
            if (item.children) {
                for (let child of item.children) {
                    if (child.key === selectedKey) {
                        return item.key
                    }
                }
            }
        }
        return null
    }

    useEffect(() => {
        if (openKeys.length <= 0) {
            const parentKey = findParentKey(datatest.menu2, selectedKeys)
            if (parentKey) {
                setOpenKeys([parentKey])
            }
        }
    }, [selectedKeys])

    const handleMenuClick = ({ key }) => {
        navigate(key)
    }

    const handleSubMenuClick = (openKeys) => {
        if (!props.collapsed) setOpenKeys(openKeys)
    }

    const handleMouseDown = (e, key) => {
        if (e.button === 1) {
            window.open(key, '_blank')
        }
    }

    const getMenuItemsWithTooltip = (items) => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    label: (
                        <Tooltip
                            title={item.label}
                            placement='right'
                            mouseEnterDelay={0.5}
                        >
                            <div
                                style={localStyle.menuItem}
                                onMouseDown={(e) =>
                                    handleMouseDown(e, item.key)
                                }
                            >
                                {item.icon && (
                                    <Icon
                                        name={item.icon}
                                        style={{ fontSize: 18 }}
                                    />
                                )}
                                <span
                                    className='menu-item-label'
                                    style={{
                                        fontWeight: token.fontWeightStrong,
                                        marginBottom: 2,
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </Tooltip>
                    ),
                    children: getMenuItemsWithTooltip(item.children),
                }
            } else {
                return {
                    key: item.key,
                    label: (
                        <Tooltip
                            title={item.label}
                            placement='right'
                            mouseEnterDelay={0.5}
                        >
                            <div
                                style={localStyle.menuItem}
                                onMouseDown={(e) =>
                                    handleMouseDown(e, item.key)
                                }
                            >
                                {item.icon && (
                                    <Icon
                                        name={item.icon}
                                        style={{ fontSize: 18 }}
                                    />
                                )}
                                <span
                                    className='menu-item-label'
                                    style={{
                                        fontWeight: token.fontWeightStrong,
                                        marginBottom: 2,
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </Tooltip>
                    ),
                }
            }
        })
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={props.collapsed}
            {...props}
        >
            <div style={localStyle.siderInerContainer}>
                <Tooltip
                    title={'Đi đến trang chủ'}
                    placement='bottom'
                    overlayInnerStyle={{ marginTop: -20 }}
                    arrow={false}
                >
                    <div
                        style={localStyle.logoArea}
                        onClick={() => navigate('/')}
                    >
                        <Image
                            src={UrlImage.Logo}
                            style={{
                                cursor: 'pointer',
                                verticalAlign: 'inherit',
                            }}
                            preview={false}
                            width={46}
                            height={46}
                        />
                        <div style={localStyle.logoText}> CTU </div>
                    </div>
                </Tooltip>

                <Menu
                    style={localStyle.menu}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onClick={handleMenuClick}
                    onOpenChange={handleSubMenuClick}
                    theme='light'
                    mode='inline'
                    items={getMenuItemsWithTooltip(datatest.menu2)}
                />
            </div>
        </Sider>
    )
}

export default AppSider
