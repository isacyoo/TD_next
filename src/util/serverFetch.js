import { fetcher } from "@/util/api"

export async function getActions() {
    const res = await fetcher('/actions')
    if (res.ok) {
        const actions =  await res.json()
        return actions.actions
    } else {
        return []
    }
}

export async function getHighRiskMembers() {
    const res = await fetcher("/high-risk-members")
    if (res.ok) {
        const members = await res.json()
        return members.high_risk_members
    } else {
        return []
    }
}

export async function getLocations() {
    const res = await fetcher("/locations")
    if (res.ok) {
        const data = await res.json()
        return data.locations
    } else {
        return []
    }
}

export async function getUserSettings() {
    const res = await fetcher("/user-settings")
    if (res.ok) {
        return await res.json()
    } else {
        return []
    }
}