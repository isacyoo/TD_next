'use client'
import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label'

const allTimes = ['', '12h','1d', '2d', '5d', '1w','2w', '4w']

export default function Filter({ actions, locationId, history}) {
    const currentSearchParams = useSearchParams()
    const actionNames = actions.map(action => action.name)
    const actionIds = actions.map(action => action.id)
    const currentChecked = Array(actionNames.length).fill(false).map((_, i) => currentSearchParams.getAll('actionId').includes(actionIds[i].toString()))
    const [ showModal, setShowModal ] = useState(false)
    const [ personId, setPersonId ] = useState(currentSearchParams.has('personId') ? currentSearchParams.get('personId') : '' )
    const [ actionsChecked, setActionsChecked ] = useState(currentChecked)
    const [ timeSelected, setTimeSelected ] = useState(currentSearchParams.has('time') ? currentSearchParams.get('time') : allTimes[0])
    const [ currentURL, setCurrentURL ] = useState(usePathname())
    const router = useRouter()
    
    const clearAllFilters = () => {
        setPersonId('')
        setTimeSelected(allTimes[0])
        setActionsChecked(Array(actionNames.length).fill(false))
    }

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

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
                <Button className="my-4">Apply Filters</Button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Apply filters</DialogTitle>
                <DialogDescription>
                Apply filters to the current view
                </DialogDescription>
            </DialogHeader>
            <ModalContent
                personId={personId}
                setPersonId={setPersonId}
                timeSelected={timeSelected}
                setTimeSelected={setTimeSelected}
                actionsChecked={actionsChecked}
                actionCheckboxHandler={actionCheckboxHandler}
                actionNames={actionNames}
                history={history}
                clearAllFilters={clearAllFilters}
                />
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
                </DialogClose>
                <DialogClose asChild>
                <Button type="button" onClick={() => {
                    filterButtonHandler()
                    setShowModal(false)
                }}>
                    Apply
                </Button>
                </DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function MemberIdFilter({ personId, setPersonId }) {
    return (
        <Input type="text" placeholder="Filter by Member ID" value={personId} onChange={(e) => setPersonId(e.target.value)} className="border-2 border-primary-200 rounded-lg p-2 w-full mb-4"/>
    )
}

function TimeFilter({ timeSelected, setTimeSelected }) {
    return (
        <div className='flex mb-4 items-center'>
        Filter by time:
        <label htmlFor="time"></label>
        <select name="time" id="time" onChange={e => setTimeSelected(e.target.value)} value={timeSelected} className='w-1/2 border-2 h-9 rounded-lg ml-4'>
            {allTimes.map((time) => (<option key={time} value={time}>{time}</option>))}
        </select>
        </div>
    )
}

function ActionFilter({ actionsChecked, actionCheckboxHandler, actionNames }) {
    return (
        <div className='mb-4'>
            <div className='border-b-primary-200 border-b-2 py-1 my-1'>
            Filter by action:
            </div>
            <div className='flex flex-col'>
            {actionNames.map(
                (act, i) => (
                    <div className='flex mt-2 items-center' key={i}>
                        <Checkbox key={i} checked={actionsChecked[i]} id={"action-"+(i)} onCheckedChange={() => {actionCheckboxHandler(i)}} className='mr-3'/>
                        <Label htmlFor={"action-"+(i)} className='text-sm'>{act}</Label>
                    </div>
                )
                )
            }
            </div>
        </div>
    )
}

function ModalContent({ personId, setPersonId, timeSelected, setTimeSelected, actionsChecked, actionCheckboxHandler, actionNames, history, clearAllFilters }) {
    return (
        <div>
            <Button variant="secondary" className="my-4" onClick={clearAllFilters}>Clear Filters</Button>
            <MemberIdFilter personId={personId} setPersonId={setPersonId} />
            <TimeFilter timeSelected={timeSelected} setTimeSelected={setTimeSelected} />
            { history ? <ActionFilter actionsChecked={actionsChecked} actionCheckboxHandler={actionCheckboxHandler} actionNames={actionNames} /> : <></> }
        </div>
    )
}