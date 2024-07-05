import React from 'react'
import { Tooltip } from 'antd'
import { Icon as AntIcon } from '@ant-design/compatible'

const Icon = ({ name, hover = '', ...props }) => {
    const [type, theme] = convertIconName(name)
    return (
        <Tooltip title={hover}>
            <AntIcon
                type={type}
                theme={theme}
                {...props}
            />
        </Tooltip>
    )
}

export default Icon

const convertIconName = (name) => {
    let outputString = name
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .slice(1)
    var lastIndex = outputString.lastIndexOf('-')
    var firstPart = outputString.slice(0, lastIndex)
    var secondPart = outputString.slice(lastIndex + 1)
    return [firstPart, secondPart]
}
