import APIKeyPanel from './APIKeyPanel'
import { SettingsH1 } from "@/components/settings/SettingsHeaders"
import { getUserSettings } from '@/util/serverFetch'

export default async function API() {
    const userSettings = await getUserSettings()
    const { api_key_expiry_date } = userSettings
    return (
        <div>
            <SettingsH1>Manage API Key</SettingsH1>
            <APIKeyPanel apiKeyExpiryDate={api_key_expiry_date}/>
        </div>
    )
}