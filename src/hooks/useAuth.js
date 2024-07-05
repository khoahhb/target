// useAuth.js
import { useContext, useEffect } from 'react'
import { AuthContext } from '@context/AuthContext'

export default function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Auth context must be inside AuthProvider')
    }

    return context
}
