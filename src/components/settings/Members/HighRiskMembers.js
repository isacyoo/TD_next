import { fetcher } from "@/util/api"
import HighRiskMembersTable from "./HighRiskMembersTable"
import HighRiskMembersReviewSetting from "./HighRiskMembersReviewSetting"

async function getHighRiskMembers() {
    const res = await fetcher("/high_risk_members")
    if (res.ok) {
        return await res.json()
    }
    throw new Error(res.status)
}

async function getUserSettings() {
    const res = await fetcher("/user_settings")
    if (res.ok) {
        return await res.json()
    }
    throw new Error(res.status)
}

export default async function HighRiskMembers() {
    const [ members, userSettings ] = await Promise.all([
        getHighRiskMembers(),
        getUserSettings()
    ])

    const reviewHighRiskMembers = userSettings.review_high_risk_members

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-xl">Update high risk members</h1>
            <HighRiskMembersTable members={members} />
            <h1 className="font-bold text-xl">Account-level members setting</h1>
            <HighRiskMembersReviewSetting reviewHighRiskMembers={reviewHighRiskMembers}/>
        </div>
    )
}