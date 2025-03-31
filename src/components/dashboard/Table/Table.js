import DashboardTableHeader from "./TableHeader"
import DashboardTableContent from "./TableContent"
import { Table } from '@/components/ui/table'

export default function DashboardTable({ events, history, pageValid, params }) {
    return (
        <>
            {pageValid ? <></> : <p className="text-center text-2xl">Page number is not valid</p>}
            <Table>
                <DashboardTableHeader history={history}/>
                <DashboardTableContent events={events} history={history} params={params}/>
            </Table>
        </>
    )
}