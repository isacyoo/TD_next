import Compliance from "./Compliance"
import { fetcher } from "@/util/api"
import { SettingsH1 } from "@/components/settings/SettingsHeaders"

async function getAccountSetting() {
    const res = await fetcher('/user-settings')
    if (!res.ok) {
        throw new Error('Failed to fetch account settings')
    }
    const data = await res.json()
    return data
}

export default async function AccountSettings() {
    const accountSettings = await getAccountSetting()
    const { video_retention_days, stream_retention_hours } = accountSettings
    return (
        <div>
            <SettingsH1>Manage account configurations</SettingsH1>
            <Compliance videoRetentionDays={video_retention_days} streamRetentionHours={stream_retention_hours} type="account"/>
        </div>
    )
}