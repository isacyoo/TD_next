export default function ActionDropdown({ actions, selectedAction, setSelectedAction }) {
    return (
    <select className="py-1 px-2 rounded-sm" id="actions" name="actions" onChange={e => setSelectedAction(e.target.value)}>
        {actions.map((action, i) => <option key={action.id} value={i} disabled={action.deleted}>{action.name}</option>)}
    </select>
    )
}