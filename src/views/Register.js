import React, { useState } from 'react'
import {
    Form,
    Input,
    Button,
    Card,
    Typography,
    message,
    DatePicker,
    Radio,
    theme,
} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useStyle } from '@hook'

const { Title, Link } = Typography

function Register() {
    const [loading, setLoading] = useState(false)
    const { CStyles, token } = useStyle(theme.useToken().token)

    const onFinish = async (values) => {
        setLoading(true)

        try {
            const response = await fakeRegisterRequest(values)

            if (response.success) {
                message.success('Registration successful!')
                // Handle successful registration (e.g., redirect to another page)
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(`Registration failed: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const fakeRegisterRequest = (values) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (values.username === 'admin') {
                    resolve({
                        success: false,
                        message: 'Username already exists',
                    })
                } else {
                    resolve({ success: true })
                }
            }, 1000)
        })
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
                    width: 400,
                    borderRadius: 10,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Title
                    level={3}
                    style={{ textAlign: 'center' }}
                >
                    Đăng ký
                </Title>

                <Form
                    name='register'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='fullname'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Full Name!',
                            },
                        ]}
                    >
                        <Input placeholder='Full Name' />
                    </Form.Item>

                    <Form.Item
                        name='birthdate'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your Birth Date!',
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder='Birth Date'
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name='gender'
                        rules={[
                            {
                                required: true,
                                message: 'Please select your Gender!',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value='male'>Male</Radio>
                            <Radio value='female'>Female</Radio>
                            <Radio value='other'>Other</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input a valid Email!',
                            },
                        ]}
                    >
                        <Input placeholder='Email' />
                    </Form.Item>

                    <Form.Item
                        name='address'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input placeholder='Address' />
                    </Form.Item>

                    <Form.Item
                        name='phone'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone Number!',
                            },
                        ]}
                    >
                        <Input placeholder='Phone Number' />
                    </Form.Item>

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
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Typography.Text>Bạn đã có tài khoản? </Typography.Text>
                        <Link href='/login'>Đăng nhập</Link>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default Register
