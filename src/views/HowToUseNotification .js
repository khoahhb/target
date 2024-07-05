import React from 'react'
import { Card, Space } from 'antd'
import CodeBlock from '@component/CodeBlock' // Đường dẫn tới component CodeBlock của bạn

const HowToUseNotification = () => {
    const codeStrings = [
        {
            title: 'Hiển thị noti thông thường',
            code: `
import { useNotification } from '@hook'
const { showNotification } = useNotification()

const openNotification = (placement) => {
    showNotification(
        'info',
        \`Notification \${placement}\`,
        'This is the content of the notification.',
        { placement }
    )
}
            `,
        },
        {
            title: 'Hiển thị noti custom',
            code: `
showNotification(
    'open',
    'Notification Title',
    'This is the content of the notification.',
    {
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        className: 'custom-class',
        style: { width: 600 },
    }
)
            `,
        },
        {
            title: 'Hiển thị thông báo có thể cập nhật',
            code: `
const key = 'updatable'
showNotification('open', 'Notification Title', 'description.', { key })
setTimeout(() => {
    showNotification('open', 'New Title', 'New description.', { key })
}, 1000)
            `,
        },
        {
            title: 'Hiển thị noti stack',
            code: `
showNotification(
    'open',
    'Notification Title',
    'This is the content of the notification.',
    {
        duration: null,
    }
)
            `,
        },
        {
            title: 'Custom close button',
            code: `
const { showNotification, closeNotification } = useNotification()

const close = () => {
    console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.'
    )
}

const openNotification = () => {
    const key = \`open${Date.now()}\`
    const btn = (
        <Space>
            <Button
                type='link'
                size='small'
                onClick={() => closeNotification()}
            >
                Destroy All
            </Button>
            <Button
                type='primary'
                size='small'
                onClick={() => closeNotification(key)}
            >
                Confirm
            </Button>
        </Space>
    )
    showNotification(
        'info',
        'Notification Title',
        'A function will be called after the notification is closed (automatically after the "duration" time or manually).',
        {
            btn,
            key,
            onClose: close,
        }
    )
}
            `,
        },
    ]

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Space
                direction='vertical'
                size='large'
                style={{ width: '100%' }}
            >
                {codeStrings.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        bordered={false}
                    >
                        <CodeBlock codeString={item.code} />
                    </Card>
                ))}
            </Space>
        </div>
    )
}

export default HowToUseNotification
