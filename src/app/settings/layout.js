import SettingsSidebar from '@/components/settings/Sidebar/Sidebar'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function SettingsLayout({ children }) {
    return (
        <div className='flex w-full'>
            <SidebarProvider>
                <SettingsSidebar />
                <SidebarTrigger />
                <div className='m-8'>
                    {children}
                </div>
            </SidebarProvider>
        </div>
    )
  }