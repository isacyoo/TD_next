import { DashboardHeaderSkeleton } from "./DashboardHeader"
import FilterSkeleton from "./Filter/FilterSkeleton"
import TableSkeleton from "./Table/TableSkeleton"

export default function DashboardLoading() {
    return (
        <div className="w-1/2">
            <DashboardHeaderSkeleton />
            <FilterSkeleton />
            <TableSkeleton />
        </div>
    )
}