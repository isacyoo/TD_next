import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function ActionDropdown({ actions, selectedAction, setSelectedAction }) {
    return (
    <Select value={selectedAction} onValueChange={setSelectedAction}>
        <SelectTrigger>
            <SelectValue placeholder="Select action to perform"/>
        </SelectTrigger>
        <SelectContent>
            {actions.map((action, i) => <SelectItem key={action.id} value={action.id} disabled={!action.is_enabled}>{action.name}</SelectItem>)}
        </SelectContent>
    </Select>
    )
}