import { useContext } from 'react'
import { ThemeContext } from '@context/ThemeContext'

export default function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('Theme context must be inside Theme Provider')
    }

    return context
}
