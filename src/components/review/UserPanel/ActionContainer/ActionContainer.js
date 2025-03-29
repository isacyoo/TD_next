'use client'
import { use, useState, useEffect } from 'react'
import ActionDropdown from "./ActionDropdown"
import ActionConfirmModal from './ActionConfirmModal'
import { usePathname, useRouter } from 'next/navigation'
import { post } from '@/util/clientApi'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function ActionContainer({ actions, currentAction }) {
    const [ currentActionName, setCurrentActionName ] = useState(currentAction)
    const [ selectedAction, setSelectedAction ] = useState(0)
    const [ showModal, setShowModal ] = useState(false)
    const pathName = usePathname()
    const router = useRouter()
    const eventId = pathName.split('/').slice(-1)[0]

    const applyActionToEvent = async (eventId, actionId) => {
        const res = await post(`/action_to_event/${eventId}/${actionId}`)
        return res.status
    }

    const setShowModalOnlyIfHistory = (showModal) => {
        if (currentAction) {
            setShowModal(showModal)
        }
        else {
            setShowModal(false)
        }
    }

    const closeAndConfirm = async () => {
        if (selectedAction == 0) {
            toast.error('Please select an action to apply')
            return
        }
        const res = await applyActionToEvent(eventId, selectedAction)
        if (res == 201) {
            setShowModal(false)
            setCurrentActionName(getSelectedActionName(selectedAction))
            toast.success(`Action ${getSelectedActionName(selectedAction)} has been applied to the event`)
        }
        else if (res == 401 || res == 403 || res == 422) {
            alert("Session has expired. Please log in again")
            router.push('/login')
        }
        else {
            toast.error('Error has occured while applying action to video. Please refresh and try again')
            setShowModal(false)
        }
    }

    const confirmIfHistory = () => {
        if (currentAction) {
            setShowModal(true)
        }
        else {
            closeAndConfirm()
        }
    }

    const getSelectedActionName = ( selectedAction ) => {
        return actions.find(action => action.id == selectedAction)?.name
    }

    return (
        <div className="my-8 w-full">
            { currentActionName ? <p className="font-bold">Current action: {currentActionName}</p> : "" }
            <div className='flex my-4 items-start'>
                <label className="mr-3 py-1 text-nowrap">Choose action:</label>
                <ActionDropdown actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction}></ActionDropdown>
            </div>
            <ActionConfirmModal selectedAction={getSelectedActionName(selectedAction)} currentAction={currentActionName} showModal={showModal} setShowModal={setShowModalOnlyIfHistory} closeAndConfirm={()=>closeAndConfirm()}>
                <Button onClick={()=>confirmIfHistory()} variant="secondary">Confirm Action</Button>
            </ActionConfirmModal>
        </div>
    )
}