import { useContext, useEffect } from 'react'
import { MessageContext } from '@context/MessageContext'

export default function useMessage() {
    const context = useContext(MessageContext)

    if (!context) {
        throw new Error('Message context must be inside MessageProvider')
    }

    return context
}
