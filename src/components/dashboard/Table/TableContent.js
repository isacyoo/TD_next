import DashboardTableRow from "./TableRow"
import { TableBody } from "@/components/ui/table"

export default function DashboardTableContent({ events, history, params, fav }) {

    return (
        <TableBody className="border-b-2 border-b-secondary">
            {events.map((event, i) => {
                return (
                    <DashboardTableRow event={event} i={i} history={history} key={i} params={params} fav={fav}/>
                )
            })}
        </TableBody>
    )
}