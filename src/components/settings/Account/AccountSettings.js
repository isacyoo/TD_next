import Compliance from "./Compliance"
import { SettingsH1 } from "@/components/settings/SettingsHeaders"
import { getUserSettings } from "@/util/serverFetch"


export default async function AccountSettings() {
    const userSettings = await getUserSettings()
    const { video_retention_days, stream_retention_hours } = userSettings
    return (
        <div>
            <SettingsH1>Manage account configurations</SettingsH1>
            <Compliance videoRetentionDays={video_retention_days} streamRetentionHours={stream_retention_hours} />
        </div>
    )
}