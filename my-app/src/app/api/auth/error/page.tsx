"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

function Page  () {
    const router = useRouter()

    const handleLogin = () => {
        router.push('/Auth/login')
    }

    handleLogin()
}

export default Page
