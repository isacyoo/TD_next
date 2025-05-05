import HighRiskMembersTable from "./HighRiskMembersTable"
import HighRiskMembersReviewSetting from "./HighRiskMembersReviewSetting"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"
import { getHighRiskMembers, getUserSettings } from "@/util/serverFetch"

export default async function HighRiskMembers() {
    const [ members, userSettings ] = await Promise.all([
        getHighRiskMembers(),
        getUserSettings()
    ])

    const reviewHighRiskMembers = userSettings.review_high_risk_members

    return (
        <div className="flex flex-col gap-4">
            <SettingsH2>Update high risk members</SettingsH2>
            <HighRiskMembersTable members={members} />
            <SettingsH2>Account-level members setting</SettingsH2>
            <HighRiskMembersReviewSetting reviewHighRiskMembers={reviewHighRiskMembers}/>
        </div>
    )
}