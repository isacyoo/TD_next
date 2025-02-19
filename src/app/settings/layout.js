import SettingsSidebar from '@/components/settings/Sidebar/Sidebar'

export default function SettingsLayout({ children }) {
    return (
        <div className='flex w-full'>
            <SettingsSidebar />
            <div className='flex justify-center w-1/2'>
                {children}
            </div>
        </div>
    )
  }