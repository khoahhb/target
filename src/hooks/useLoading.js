import { useContext, useEffect } from 'react'
import { LoadingContext } from '@context/LoadingContext'

export default function useLoading() {
    const context = useContext(LoadingContext)

    if (!context) {
        throw new Error('Loading context must be inside Loading Provider')
    }

    return context
}
