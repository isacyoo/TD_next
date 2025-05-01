import { Input } from "@/components/ui/input"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"

export default function LocationNameChange({ name, setName }) {
    const handleNameChange = (e) => {
        const value = e.target.value
        
        if (value.length > 50) {
            setName(value.slice(0, 50))
        } else {
            setName(value)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <SettingsH2>Location Name</SettingsH2>
            <div className="flex gap-2 mb-2">
                <Input id="location-name" value={name} onChange={handleNameChange} />
            </div>
        </div>
    )
}