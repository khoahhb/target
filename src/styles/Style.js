export const CreateStyle = (token) => {
    return {
        Dashboard: {
            header: {
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                justifyContent: 'space-between',
            },
            headerCol2: {
                display: 'flex',
                flexGrow: 1,
                alignItems: 'center',
                paddingLeft: '34px',
                paddingRight: '34px',
            },
            headerCol3: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '16px',
                width: '320px',
            },
            siderInerContainer: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            },
            menuItem: {
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            logoArea: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 12,
                backgroundColor: token.Menu.itemBg,
                cursor: 'pointer',
            },
            logoText: {
                color: token.colorPrimary,
                fontSize: '30px',
                fontWeight: 'bold',
                marginLeft: 8,
            },
            menu: {
                flex: 1,
                width: '100%',
            },
            content: {
                display: 'flex',
                flex: 1,
                padding: '16px',
                textAlign: 'center',
            },
            cardWraper: {
                textAlign: 'center',
                padding: '16px',
                overflow: 'auto',
                // display: 'flex',
                flex: 1,
                borderRadius: '6px',
            },
            layout: {
                width: '100vw',
                height: '100vh',
            },
            searchBox: {
                boxShadow: token.boxShadow,
                borderRadius: token.borderRadius,
                padding: '16px',
            },
            textModuleMenu: {
                maxWidth: 70,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '10pt',
                whiteSpace: 'nowrap',
            },
            infoAccount: {
                boxShadow: token.boxShadow,
                borderRadius: 10,
                borderWidth: 1,
                width: 238,
            },
            layoutContainer: {
                position: 'relative',
            },
            boxFilter: {
                width: 350,
                height: 38,
            },
        },
        Loading: {
            display: 'flex',
            width: '100vw',
            height: '100vh',
            padding: 8,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: token.colorBgLayout,
            color: token.black,
        },
    }
}
