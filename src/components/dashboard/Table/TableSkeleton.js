import { Skeleton } from '@/components/ui/skeleton';
import { Table } from '@/components/ui/table'
import DashboardTableHeader from './TableHeader';

export default function TableSkeleton({ history }) {
    return (
        <div className="w-full flex flex-col gap-1">
            <Table className="w-full">
                <DashboardTableHeader history={history} />
            </Table>
            <Skeleton className="h-9"/>
            <Skeleton className="h-9"/>
            <Skeleton className="h-9"/>
        </div>
    )
}