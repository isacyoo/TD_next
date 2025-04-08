import HighRiskMembers from './HighRiskMembers'
import { SettingsH1 } from "@/components/settings/SettingsHeaders"

export default async function Members() {
    return (
        <div>
            <SettingsH1>Manage high risk members</SettingsH1>
            <HighRiskMembers />
        </div>
    )
}