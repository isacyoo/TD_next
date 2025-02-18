import Link from 'next/link'

export default function TableRow({ event, i, history }) {
    const allPersonIds = event.entries.map(entry => entry.person_id).join(', ')
    return (
        <tr>
            <td key={event.id + 'link' + i} className='p-2 text-left text-ellipsis whitespace-nowrap overflow-hidden hover:underline'><Link href={'/review-event/'+event.id}>View event</Link></td>
            <td key={event.id + 'time' + i}>{event.entered_at}</td>
            <td key={event.id + 'id' + i}>{allPersonIds}</td>
            {history && <td key={event.id + 'action' + i}>{event.action.name}</td>}
        </tr>
        )
}