import { STYLES } from '@style'

export default function useStyle(token, viewName) {
    const CStyles = STYLES.CreateStyle(token)
    return { CStyles, token }
}
