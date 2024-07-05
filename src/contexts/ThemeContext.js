import { createContext, useState, useMemo, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/vi_VN'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
dayjs.locale('vi')

//Token dùng chung cả dark và light mode
const TokenCommon = () => {
    const common = {}

    return {
        token: {
            activeBarBorderWidth: 0,
            fontFamily: 'Segoe UI',
        },
        components: {
            Typography: {
                fontSizeHeading1: 34,
                fontSizeHeading3: 22,
                fontSizeHeading4: 18,
                fontSizeHeading5: 14,
                fontSizeHeading2: 32,
                titleMarginTop: '0.8em',
                titleMarginBottom: '0.8em',
            },
        },
        cssVar: true,
        // hashed: false,
    }
}

//Token chỉ dùng ở light mode
const TokenLight = () => {
    const common = {
        colorPrimary: '#4463d8',
        colorBg: '#ffff',
        colorText: '#6e6b7b',
        subTitleBgMenu: 'var(--subtitle-light)',
    }

    return {
        token: {
            isDarkMode: false,
            colorPrimary: common.colorPrimary,
            colorText: common.colorText,
            colorBorder: common.colorText,
            colorTextPlaceholder: common.colorText,
            activeBarBorderWidth: 0,
            black: '#000',
        },
        components: {
            Layout: {
                headerBg: common.colorBg,
                siderBg: common.colorBg,
                headerColor: common.colorText,
                siderColor: common.colorText,
            },
            Divider: {
                margin: 0,
            },
            Menu: {
                itemSelectedBg: 'rgba(216, 227, 255,0.6)',
                itemBorderRadius: 16,
                itemHoverBg: 'rgba(216, 227, 255, 0.6)',
                colorSplit: 'rgba(5, 5, 5, 0)',
            },
            Table: {
                headerBg: 'rgb(240, 240, 240)',
                headerColor: 'rgba(0, 0, 0, 0.88)',
                rowHoverBg: 'rgb(240, 240, 240)',
                borderColor: 'rgba(158, 158, 158,0.2)',
            },
            Typography: {
                colorTextHeading: 'rgba(0, 0, 0, 0.88)',
            },
        },
    }
}

//Token chỉ dùng ở dark mode
const TokenDark = () => {
    const common = {
        colorPrimary: '#53c9ff',
        colorBg: '#283046',
        colorText: '#b4b7bd',
        colorLayout: '#161d31',
        subTitleBgMenu: 'var(--subtitle-dark)',
        colorPageHeader: '#ffff',
    }

    return {
        token: {
            isDarkMode: true,
            colorPrimary: common.colorPrimary,
            colorText: common.colorText,
            colorBorder: common.colorText,
            colorTextPlaceholder: common.colorText,
            black: common.colorPageHeader,
            colorBgElevated: common.colorBg,
            colorBgContainer: common.colorBg,
            colorBgLayout: common.colorLayout,
            boxShadow:
                '12px -16px 42px 0px rgba(0, 0, 0, 0.3),\n            0 3px 6px -0 rgba(0, 0, 0, 0.3),\n            0 9px 28px 8px rgba(0, 0, 0, 0.3)',
            colorFillContentHover: 'rgb(22, 29, 49)',
            colorTextTertiary: 'rgb(168, 174, 188)',
            colorTextQuaternary: 'rgb(168, 174, 188)',
        },
        components: {
            Layout: {
                headerBg: common.colorBg,
                siderBg: common.colorBg,
                headerColor: common.colorText,
                siderColor: common.colorText,
            },
            Card: {
                colorBorderSecondary: '#ffffff00',
            },
            Button: {
                primaryShadow: '0px 0px 8px 2px rgba(255, 255, 255, 0.15)',
            },
            Divider: {
                margin: 0,
                colorSplit: common.colorText,
            },
            Select: {
                colorTextQuaternary: common.colorText,
                colorTextDisabled: 'rgba(155, 210, 253, 0.6)',
            },
            Menu: {
                colorText: 'rgb(180, 183, 189)',
                colorSplit: 'rgba(5, 5, 5, 0)',
                itemBg: 'rgb(13, 15, 40)',
                itemActiveBg: 'rgba(174, 181, 199, 0.3)',
                itemSelectedBg: 'rgba(174, 181, 199, 0.3)',
                subMenuItemBg: 'rgba(147, 160, 198, 0.2)',
            },
            Table: {
                borderColor: common.colorText,
                headerBg: 'rgb(78, 94, 135)',
                headerColor: 'rgba(255, 255, 255, 0.88)',
                rowHoverBg: 'rgba(123, 148, 213, 0.2)',
                headerSplitColor: 'rgb(180, 183, 189)',
                headerSortHoverBg: 'rgb(104, 117, 149)',
                headerSortActiveBg: 'rgb(104, 117, 149)',
                headerFilterHoverBg: 'rgb(104, 117, 149)',
            },
            Tabs: {
                cardBg: 'rgb(78, 94, 135)',
                itemColor: 'rgba(255, 255, 255, 0.88)',
                itemHoverColor: 'rgba(255, 255, 255, 0.88)',
                colorBorderSecondary: common.colorText,
            },
            Typography: {
                colorTextHeading: 'rgba(255, 255, 255, 0.88)',
            },
        },
    }
}

const getTheme = (mode) =>
    mergeToken(mode === 'light' ? TokenLight() : TokenDark(), TokenCommon())

const ThemeContext = createContext({
    toggleColorMode: () => {},
})

const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light')

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode')
        if (savedMode) {
            setMode(savedMode)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('themeMode', mode)
    }, [mode])

    const themeMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        []
    )
    const theme = useMemo(() => getTheme(mode), [mode])

    return (
        <ThemeContext.Provider value={themeMode}>
            <ConfigProvider
                locale={locale}
                direction='ltr'
                theme={theme}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }

//Hàm xử lí merge common token và token dark, light
const mergeToken = (a, b) => {
    const mergeComponents = (componentA, componentB) => {
        const mergedComponent = { ...componentA }
        Object.keys(componentB).forEach((key) => {
            if (typeof componentB[key] === 'object' && componentA[key]) {
                mergedComponent[key] = mergeComponents(
                    componentA[key],
                    componentB[key]
                )
            } else {
                mergedComponent[key] = componentB[key]
            }
        })
        return mergedComponent
    }
    const { token: tokenA, components: componentsA, ...otherA } = a
    const { token: tokenB, components: componentsB, ...otherB } = b
    const merged = {
        token: { ...a.token, ...b.token },
        components: mergeComponents(a.components, b.components),
        ...otherA,
        ...otherB,
    }
    return merged
}
