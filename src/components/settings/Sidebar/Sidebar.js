import Link from 'next/link'

export default function SettingsSidebar() {
    return (
        <div className='bg-primary-500 bg-linear-to-r text-primary-100 h-screen px-4'>
            <ul className='mt-2'>
                <li className='py-3 border-b border-primary-900 text-l font-extrabold'>
                    Settings
                </li>
                <li className='py-3 px-2 border-b border-primary-900 text-l font-semibold'>
                    Manage
                </li>
                <li className='py-3 px-10 border-b border-primary-900 font-light hover:bg-primary-700 duration-150'>
                    <Link href='/settings/actions'>Actions</Link>
                </li>
                <li className='py-3 px-10 border-b border-primary-900 font-light hover:bg-primary-700 duration-150'>
                    <Link href='/settings/schedule'>Schedule</Link>
                </li>
                <li className='py-3 px-10 border-b border-primary-900 font-light hover:bg-primary-700 duration-150'>
                    <Link href='/settings/api'>API key</Link>
                </li>                
            </ul>
        </div>
    )
}