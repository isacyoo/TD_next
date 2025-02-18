'use client'
import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const allTimes = ['', '12h','1d', '2d', '5d', '1w','2w']

export default function Filter({ actions, locationId, history}) {
    const currentSearchParams = useSearchParams()
    const actionNames = Object.keys(actions)
    const actionIds = Object.values(actions)
    const currentChecked = Array(actionNames.length).fill(false).map((_, i) => currentSearchParams.getAll('actionId').includes(actionIds[i].toString()))
    const [showModal, setShowModal] = useState(false)
    const [personId, setPersonId] = useState(currentSearchParams.has('personId') ? currentSearchParams.get('personId') : '' )
    const [actionsChecked, setActionsChecked] = useState(currentChecked)
    const [timeSelected, setTimeSelected] = useState(currentSearchParams.has('time') ? currentSearchParams.get('time') : allTimes[0])
    const [currentURL, setCurrentURL] = useState(usePathname())
    const router = useRouter()
    

    const actionCheckboxHandler = (i) => {
        let newActionsChecked = [...actionsChecked]
        newActionsChecked[i] = !newActionsChecked[i]
        setActionsChecked(newActionsChecked)
        buildURL()
    }

    const buildSearchParams = () => {
        let searchParams = new URLSearchParams()
        if (personId) {
            searchParams.append('personId', personId)
        }
        if (timeSelected) {
            searchParams.append('time', timeSelected)
        }
        if (history) {
            const selectedActionIds = actionIds.filter((_, i) => actionsChecked[i])
            if (selectedActionIds.length > 0) {
                selectedActionIds.map((id) => searchParams.append('actionId', id))
            }
        }
        return searchParams.toString()
    }

    const buildURL = () => {
        const searchParams = buildSearchParams()
        const url = `/${locationId}/${history ? 'history' : 'dashboard'}/1`
        return `${url}?${searchParams}`
    }

    const filterButtonHandler = () => {
      router.push(currentURL)
      setShowModal(false)
    }
    useEffect(() => {
        setCurrentURL(buildURL())
    }, [personId, timeSelected, actionsChecked])

    
    return (<>
<button onClick={() => setShowModal(true)} className="block text-primary-900 bg-primary-100 hover:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-500 font-semibold rounded-lg text-sm px-5 py-2.5 text-center my-4" type="button">
  Apply Filters
</button>
{showModal ? (
        <>
          <div
            className="fixed inset-0 flex flex-col justify-center items-center bg-primary-900 bg-opacity-50 z-50"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary-100 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-primary-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Apply filters
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-primary-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-primary-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto border-0 rounded-lg bg-primary-50">
                    <input type="text" placeholder="Filter by Member ID" value={personId} onChange={(e) => setPersonId(e.target.value)} className="border-2 border-primary-200 rounded-lg p-2 w-full mb-4"/>
                    <div className='flex mb-4 items-center'>
                    Filter by time:
                    <label htmlFor="time"></label>
                    <select name="time" id="time" onChange={e => setTimeSelected(e.target.value)} value={timeSelected} className='w-1/2 border-2 h-9 rounded-lg ml-4'>
                        {allTimes.map((time) => (<option key={time} value={time}>{time}</option>))}
                    </select>
                    </div>
                    {
                        history ? (
                            <div className='mb-4'>
                                <div className='border-b-primary-200 border-b-2 py-1 my-1'>
                                Filter by action:
                                </div>
                                <div className='flex flex-col'>
                                { actionNames.map(
                                    (act, i) => (<div className='flex' key={i}><input type="checkbox" checked={actionsChecked[i]} id={"action-"+(i)} value={act} key={act} onChange={() => {actionCheckboxHandler(i)}} className='mr-3'/><label htmlFor={"action-"+(i)}>{act}</label></div>)
                                    )
                                }
                                </div>
                            </div>
                        )   : (
                            <></>
                        )
                    }
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-primary-200 rounded-b">
                  <button
                    className="text-primary-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary-600 text-primary-100 active:bg-primary-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-primary-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => filterButtonHandler()}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


</>

    )
}