import React, { useState, useContext } from 'react'
import { Form, Input, Button, Card, Typography, message, theme } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useStyle } from '@hook'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@context/AuthContext'
const { Title, Link } = Typography

function Login() {
    const [loading, setLoading] = useState(false)
    const { CStyles, token } = useStyle(theme.useToken().token)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)

        try {
            const response = await signIn(values.username, values.password)

            if (response.success) {
                message.success('Login successful!')
                navigate('/')
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(`Login failed: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: token.colorBgLayout,
            }}
        >
            <Card
                style={{
                    width: 350,
                    padding: 16,
                    borderRadius: 10,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Title
                    level={3}
                    style={{ textAlign: 'center' }}
                >
                    Đăng nhập
                </Title>

                <Form
                    name='login'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input placeholder='Username' />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder='Password'
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            block
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    {/* <div style={{ textAlign: 'center' }}>
                        <Typography.Text>
                            Bạn không có tài khoản?{' '}
                        </Typography.Text>
                        <Link href='/register'>Đăng ký</Link>
                    </div> */}
                </Form>
            </Card>
        </div>
    )
}

export default Login
