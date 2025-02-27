import APIKeyPanel from './APIKeyPanel'

export default async function API() {
    return (
        <div>
            <h1 className="font-extrabold text-2xl mb-4">Manage your API Key</h1>
            <APIKeyPanel />
        </div>
    )
}