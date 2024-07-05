// src/contexts/auth/AuthContext.js

import React, { createContext, useReducer, useEffect } from 'react'
import { loginAdmin } from '@service/adminService'

//Reducer
export const AuthActionType = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
}

const reducerHandlers = {
    [AuthActionType.INITIALIZE](state, action) {
        const { isAuthenticated, user } = action.payload
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        }
    },
    [AuthActionType.SIGN_IN](state, action) {
        const { user } = action.payload
        return {
            ...state,
            isAuthenticated: true,
            user,
        }
    },
    [AuthActionType.SIGN_OUT](state) {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        }
    },
}

export function reducer(state, action) {
    if (!reducerHandlers[action.type]) return state
    return reducerHandlers[action.type](state, action)
}

// Actions
export function initialize(payload) {
    return {
        type: AuthActionType.INITIALIZE,
        payload,
    }
}

export function signIn(payload) {
    return {
        type: AuthActionType.SIGN_IN,
        payload,
    }
}

export function signOut() {
    localStorage.removeItem('ACCESS_TOKEN')
    return { type: AuthActionType.SIGN_OUT, payload: { user: null } }
}

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
}

const AuthContext = createContext({
    ...initialState,
    dispatch: () => null,
    signIn: () => Promise.resolve(),
    signOut: () => {},
})

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        ;(() => {
            const accessToken = localStorage.getItem('ACCESS_TOKEN')

            if (!accessToken) {
                return dispatch(
                    initialize({ isAuthenticated: false, user: null })
                )
            }

            try {
                const user = { username: 'admin'}

                dispatch(initialize({ isAuthenticated: true, user }))
            } catch {
                dispatch(initialize({ isAuthenticated: false, user: null }))
            }
        })()
    }, [])

    const handleSignIn = async (username, password) => {
        const data = loginAdmin(username, password)
        if (data.status){
            localStorage.setItem('ACCESS_TOKEN', 'fake-token')
            const user = { username: 'admin' }
            dispatch(signIn({ isAuthenticated: true, user }))
            return {
                success: true,
            }
        } else {
            return {
                success: false,
                message: data.message,
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOut())
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                dispatch,
                signIn: handleSignIn,
                signOut: handleSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
