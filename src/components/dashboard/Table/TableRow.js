import Link from 'next/link'
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
  

export default function DashboardTableRow({ event, i, history, params }) {
    const allMemberIds = event.entries.map(entry => entry.member_id).join(', ')
    return (
        <TableRow>
            <TableCell key={event.id + 'link' + i} className='hover:underline'><Link href={`/review-event/${event.id}?${params}`}>Start reviewing</Link></TableCell>
            <TableCell key={event.id + 'time' + i}>{event.entered_at}</TableCell>
            <TableCell key={event.id + 'id' + i}>{allMemberIds}</TableCell>
            {history && <TableCell key={event.id + 'action' + i}>{event.action.name}</TableCell>}
        </TableRow>
        )
}