import { useContext, useEffect } from 'react'
import { NotificationContext } from '@context/NotificationContext'

export default function useNotification() {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error(
            'Notification context must be inside NotificationProvider'
        )
    }

    return context
}
