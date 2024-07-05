import React, { useState } from 'react'
import { AppHeader, AppSider, AppContent } from '@component'
import { Layout, theme } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStyle } from '@hook'
import { Outlet } from 'react-router-dom'

const Dashboard = (props) => {
    const { CStyles, token } = useStyle(theme.useToken().token)
    const localStyle = CStyles.Dashboard
    const navigate = useNavigate()
    const location = useLocation()

    const rootprops = {
        navigate,
        location,
        CStyles,
        token,
    }

    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout style={localStyle.layout}>
            <AppSider
                collapsed={collapsed}
                rootprops={rootprops}
            />
            <Layout>
                <AppHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    rootprops={rootprops}
                />
                <AppContent rootprops={rootprops}>
                    <Outlet />
                </AppContent>
            </Layout>
        </Layout>
    )
}

export default Dashboard
