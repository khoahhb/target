import 'antd/dist/reset.css'
import '@style/styles.css'
import React, { Suspense } from 'react'
import { Spin, theme } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useStyle } from '@hook'

function Loading(props) {
    let { CStyles, token } = useStyle(theme.useToken().token)

    return (
        <div style={CStyles.Loading}>
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 40,
                        }}
                        spin
                    />
                }
            />
            <span style={{ marginTop: 16 }}>Loading...</span>
        </div>
    )
}

export default Loading
