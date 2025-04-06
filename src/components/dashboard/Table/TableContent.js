import DashboardTableRow from "./TableRow"

export default function DashboardTableContent({ events, history, params, fav }) {

    return (
        <tbody className="border-b-2 border-b-primary-900">
            {events.map((event, i) => {
                return (
                    <DashboardTableRow event={event} i={i} history={history} key={i} params={params} fav={fav}/>
                )
            })}
        </tbody>
    )
}