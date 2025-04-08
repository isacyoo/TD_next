import APIKeyPanel from './APIKeyPanel'
import { SettingsH1 } from "@/components/settings/SettingsHeaders"

export default async function API() {
    return (
        <div>
            <SettingsH1>Manage API Key</SettingsH1>
            <APIKeyPanel />
        </div>
    )
}