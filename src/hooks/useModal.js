import { useContext } from 'react'
import { ModalContext } from '@context/ModalContext'

export default function useModal() {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('Modal context must be inside Modal Provider')
    }

    return context
}
