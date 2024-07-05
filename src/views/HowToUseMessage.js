import React from 'react'
import { Card, Space } from 'antd'
import CodeBlock from '@component/CodeBlock' // Đường dẫn tới component CodeBlock của bạn

const HowToUseMessage = () => {
    const codeStrings = [
        {
            title: 'Hiển thị thông điệp thông thường',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const handleTestClick = () => {
    showMessage('info', 'Hello, Ant Design!');
};
            `,
        },
        {
            title: 'Hiển thị các loại thông điệp khác nhau',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const showSuccess = () => {
    showMessage('success', 'This is a success message');
};

const showError = () => {
    showMessage('error', 'This is an error message');
};

const showWarning = () => {
    showMessage('warning', 'This is a warning message');
};
            `,
        },
        {
            title: 'Tùy chỉnh thời gian hiển thị thông điệp',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const showCustomDurationMessage = () => {
    showMessage('success', 'This message will disappear in 10 seconds', 10);
};
            `,
        },
        {
            title: 'Hiển thị thông điệp loading và tự động hủy',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const showLoadingMessage = () => {
    const key = 'loading';
    showMessage('loading', 'Action in progress..', 0, { key });
    setTimeout(() => {
        showMessage('success', 'Loaded!', 2, { key });
    }, 2500);
};
            `,
        },
        {
            title: 'Tùy chỉnh style cho thông điệp',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const showCustomStyleMessage = () => {
    showMessage('success', 'This is a custom styled message', 3, {
        className: 'custom-class',
        style: { marginTop: '20vh' },
    });
};
            `,
        },
        {
            title: 'Hiển thị thông điệp tuần tự',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const showSequentialMessages = () => {
    showMessage('loading', 'Action in progress..', 2.5)
        .then(() => showMessage('success', 'Loading finished', 2.5))
        .then(() => showMessage('info', 'Loading finished', 2.5));
};
            `,
        },
        {
            title: 'Cập nhật nội dung thông điệp',
            code: `
import { useMessage } from '@hook';

const { showMessage } = useMessage();

const showUpdatableMessage = () => {
    const key = 'updatable';
    showMessage('loading', 'Loading...', 0, { key });
    setTimeout(() => {
        showMessage('success', 'Loaded!', 2, { key });
    }, 1000);
};
            `,
        },
        {
            title: 'Xóa messages',
            code: `
const { showMessage, closeMessage } = useMessage()

    const messageKeys = useRef([])

    const showMessages = () => {
        for (let i = 0; i < 10; i++) {
            const key = \`message-\${i}\`
            messageKeys.current.push(key)
            showMessage('info', \`Message \${i + 1}\`, 0, { key })
        }
    }

    const closeMessages = () => {
        //Trường hợp xóa theo key
        messageKeys.current.forEach((key) => {
            closeMessage(key)
        })
        messageKeys.current = []
        //Trường hợp xóa tất cả
        closeMessage()
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

export default HowToUseMessage
