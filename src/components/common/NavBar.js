'use client'
import React from 'react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { clientFetch } from '@/util/clientApi'
import SettingsDropdown from './SettingsDropdown';
import DashboardDropdown from './DashboardDropdown';
import ModeToggle from "@/components/common/ModeToggle";


export default function NavBar({ session, locations }) {
    const router = useRouter()

    const logout = () => {
        clientFetch('POST', '/logout').then(() => {
            router.push('/login')
        })
    }

    const pathName = usePathname()
    if (pathName == '/login') {
        return <></>
    }
    return (
        <div className='flex items-center w-auto h-12 p-4 shadow-md'>
            <Link href ='/home' className='ml-5 font-bold transition-all'>
                Home
            </Link>
            <div className='h-7 w-0.5 border-l-2 border-l-primary-900 mx-7'></div>
            <DashboardDropdown locations={locations} />
            <div className='h-7 w-0.5 border-l-2 border-l-primary-900 mx-7'></div>

            <div className='flex items-center ml-auto mr-2'>
                <div className='flex items-center hidden md:block mx-7'>Welcome {session?.name} !</div>
                <ModeToggle />
                <div className='h-7 w-0.5 border-l-2 border-l-primary-900 mx-7'></div>
                <SettingsDropdown />
                <div className='h-7 w-0.5 border-l-2 border-l-primary-900 ml-7'></div>
                <div className='cursor-pointer ml-7' onClick={() => logout()}>Log Out</div>
            </div>
        </div>
    )
}