import Link from 'next/link'
import GoToPageForm from './GoToPageForm'
import { Button } from "@/components/ui/button"

export default function Pagination({ currentPage, perPage, pages, total, iterPages, locationId, searchParams, history }) {
    const params = new URLSearchParams(searchParams).toString()
    const createButton = (page, i) => {
        if (page == null) {
            return (
                <Button className="mx-2" disabled key={i}>
                    ...
                </Button>
            )
        }
        return (
            <Link href={`/${locationId}/${history ? 'history' : 'dashboard'}/${page}?${params}`} key={i}>
                <Button variant={currentPage == page ? "default" : "secondary"} className="mx-2">{page}</Button>
            </Link>
        )
    }
    const start = (total == 0) ? 0: perPage * (currentPage - 1) + 1
    const end = Math.min(perPage * currentPage, total)
    return (
        <div className="flex-col mt-4">
            <div>
                Showing {start}-{end} of {total} results
            </div>
            <div className="flex my-4 items-center justify-center">
                {iterPages.map((page, i) => createButton(page, i))}
            </div>
            <GoToPageForm locationId={locationId} history={history} pages={pages} currentPage={currentPage}/>
        </div>
    )
}