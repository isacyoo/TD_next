'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'


export default function GoToPageForm({ locationId, history, pages, currentPage }) {
    const [goToPage, setGoToPage] = useState(currentPage)
    const searchParams = new URLSearchParams(useSearchParams()).toString()
    const router = useRouter()
    
    const onGoToClick = (goToPage) => {
        if (goToPageSanityCheck(goToPage)) {
            router.push(`/${locationId}/${history ? 'history' : 'dashboard'}/${goToPage}?${searchParams}`)
        } else {
            alert("Invalid page!")
            setGoToPage(undefined)
        }
    }

    const goToPageSanityCheck = (goToPage) => {
        if (goToPage === undefined) {
            return false
        }
        if (!Number.isInteger(parseFloat(goToPage))) {
            return false
        }
        if (goToPage < 1 || goToPage > pages) {
            return false
        }
        return true
    }

    return (
        <div className="m-2 flex justify-center">
            <div className="flex mx-2 items-center">Go To Page:</div>
            <input className="flex text-center mx-2 rounded-md text-sm w-10 border-primary-900 border-2" onChange={(e) => setGoToPage(e.target.value)} type="number" id="page" name="page" value={goToPage} min="1" max={pages}></input>
            <button className="rounded-md bg-primary-700 text-primary-100 border-0 inline-block text-base font-medium py-2 px-3 text-center transition-all cursor-pointer align-baseline whitespace-nowrap select-none" onClick={() => onGoToClick(goToPage)}>Go</button>
        </div>
    )
}
