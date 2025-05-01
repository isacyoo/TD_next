import { Switch } from "@/components/ui/switch"
import HighRiskLink from "./HighRiskLink"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"

export default function LocationHighRisk({ isEnabled, setIsEnabled }) {
    return (
        <div>
            <SettingsH2>High-risk members</SettingsH2>
            <div className="flex items-center my-4">
                <span className="mr-4">Always review high-risk members</span>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled}/>
            </div>
            <HighRiskLink />
        </div>
    )
}