import { Suspense } from 'react'

import FilterWrapper from './Filter/FilterWrapper'
import DashboardContent from "./DashboardContent"
import DashboardHeader from "./DashboardHeader"

import FilterSkeleton from "./Filter/FilterSkeleton"
import TableSkeleton from "./Table/TableSkeleton"
import { DashboardHeaderSkeleton } from "./DashboardHeader"

export default async function Dashboard({ page, searchParams, locationId, history, fav }) {
    const params = new URLSearchParams()
    if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
            if (Array.isArray(value)) {
                value.map((v) => params.append(key, v))
            }
            else {
                params.append(key, value)
            }
        }
    }
    
    return (
        <div className="w-1/2">
            <Suspense fallback={<DashboardHeaderSkeleton />}>
                <DashboardHeader locationId={locationId} history={history} fav={fav}/>
            </Suspense>
            <Suspense fallback={<FilterSkeleton />}>
                <FilterWrapper locationId={locationId} history={history} fav={fav}></FilterWrapper>
            </Suspense>
            <Suspense fallback={<TableSkeleton history={history} />}>
                <DashboardContent history={history} params={params} locationId={locationId} page={page} fav={fav}/>
            </Suspense>
        </div>

    )
}