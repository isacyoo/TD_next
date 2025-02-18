import TableRow from "./TableRow"

export default function TableContent({ events, history }) {

    return (
        <tbody className="border-b-2 border-b-primary-900">
            {events.map((event, i) => {
                return (
                    <TableRow event={event} i={i} history={history} key={i}/>
                )
            })}
        </tbody>
    )
}