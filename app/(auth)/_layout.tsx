import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'

const AuthLayout = () => {
    return (
        <>
            <StatusBar style='auto'/>
            <Slot />
        </>
    )
}

export default AuthLayout