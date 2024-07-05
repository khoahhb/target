import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@store'
import { MessageProvider } from '@context/MessageContext'
import { NotificationProvider } from '@context/NotificationContext'
import { AuthProvider } from '@context/AuthContext'
import { LoadingProvider } from '@context/LoadingContext'
import { ThemeProvider } from '@context/ThemeContext'
import { ModalProvider } from '@context/ModalContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <MessageProvider>
                <NotificationProvider>
                    <ModalProvider>
                        <AuthProvider>
                            <LoadingProvider>
                                <ThemeProvider>
                                    <App />
                                </ThemeProvider>
                            </LoadingProvider>
                        </AuthProvider>
                    </ModalProvider>
                </NotificationProvider>
            </MessageProvider>
        </Provider>
    </BrowserRouter>
)
