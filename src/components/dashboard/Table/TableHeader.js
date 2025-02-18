export default function TableHeader({ history }) {
    return (
        <thead className="border-b-primary-900 border-b-2">
            <tr>
                <th key='header-link' className="p-2 w-auto text-left">Links</th>
                <th key='header-time' className="p-2 w-1/3 text-left">Time</th>
                <th key='header-id' className="p-2 w-1/4 text-left">Member Id</th>
                {history && <th key='header-action' className="p-2 w-1/4 text-left">Action</th>} 
            </tr>
        </thead>
    )
}