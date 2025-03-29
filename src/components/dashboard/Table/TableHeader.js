import {
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function DashboardTableHeader({ history }) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead key='header-link'>Links</TableHead>
                <TableHead key='header-time'>Time</TableHead>
                <TableHead key='header-id'>Member Id</TableHead>
                {history && <TableHead key='header-action'>Action</TableHead>} 
            </TableRow>
        </TableHeader>
    )
}