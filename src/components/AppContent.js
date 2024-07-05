import React, { useEffect, useState } from 'react'
import { Layout, Spin } from 'antd'
import datatest from '@asset/Datatest'
import Icon from '@component/Icon'
import { useLoading } from '@hook'

const { Content } = Layout

const AppContent = (props) => {
    const { CStyles, token, navigate, location } = props.rootprops
    const localStyle = CStyles.Dashboard
    const { isLoading, setIsLoading } = useLoading()

    return (
        <Content style={localStyle.content}>
            <div
                style={{
                    ...localStyle.cardWraper,
                    backgroundColor: token.Layout.headerBg,
                }}
            >
                {isLoading ? <Spin /> : props.children}
            </div>
        </Content>
    )
}

export default AppContent
