import TableHeader from "./TableHeader"
import TableContent from "./TableContent"

export default function Table({ events, history, pageValid }) {
    
    return (
        <>
            {pageValid ? <></> : <p className="text-center text-2xl">Page number is not valid</p>}
            <table className="w-full border-collapse table-fixed">
                <TableHeader history={history}/>
                <TableContent events={events} history={history}/>
            </table>
        </>
    )
}