import HighRiskMembers from './HighRiskMembers'

export default async function Members() {
    return (
        <div>
            <h1 className="font-extrabold text-2xl mb-4">Manage high risk members</h1>
            <HighRiskMembers />
        </div>
    )
}