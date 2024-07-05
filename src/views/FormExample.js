import React, { useState, useContext } from 'react'
import { Form, Input, Button, Card, Typography, message, theme } from 'antd'
import { useStyle } from '@hook'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@context/AuthContext'
const { Title, Link } = Typography

function FormExample() {
    const [loading, setLoading] = useState(false)
    const { CStyles, token } = useStyle(theme.useToken().token)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()

    return <div>FormExample</div>
}

export default FormExample
