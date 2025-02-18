import Link from 'next/link'
import GoToPageForm from './GoToPageForm'

export default function Pagination({ currentPage, perPage, pages, total, iterPages, locationId, searchParams, history }) {
    const params = new URLSearchParams(searchParams).toString()
    const createButton = (page, i) => {
        return (
            <Link href={`/${locationId}/${history ? 'history' : 'dashboard'}/${page}?${params}`} key={i} className="m-2 rounded-lg py-2 px-3 text-sm border-2 cursor-pointer inline-block leading-5 transition-all border-primary-900">
                    {page}
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
            <div className="flex my-2 items-center justify-center">
                {iterPages.map((page, i) => createButton(page, i))}
            </div>
            <GoToPageForm locationId={locationId} history={history} pages={pages} currentPage={currentPage}/>
        </div>
    )
}