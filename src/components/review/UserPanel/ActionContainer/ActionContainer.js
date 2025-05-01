'use client'
import { useState } from 'react'
import ActionDropdown from "./ActionDropdown"
import ActionConfirmModal from './ActionConfirmModal'
import { usePathname } from 'next/navigation'
import { clientFetch } from '@/util/clientApi'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommentInput from './CommentInput'

export default function ActionContainer({ actions, currentAction, comment }) {
    const [ currentActionName, setCurrentActionName ] = useState(currentAction)
    const [ selectedAction, setSelectedAction ] = useState(0)
    const [ currentComment, setCurrentComment ] = useState(comment)
    const [ showModal, setShowModal ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const pathName = usePathname()
    const eventId = pathName.split('/').slice(-1)[0]

    const applyActionToEvent = async (eventId, actionId) => {
        const res = await clientFetch('POST', `/action-to-event/${eventId}/${actionId}`, {
            comment: currentComment
        }, setLoading)
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
        const res = await applyActionToEvent(eventId, selectedAction)
        if (res == 201) {
            setShowModal(false)
            setCurrentActionName(getSelectedActionName(selectedAction))
            toast.success(`Action ${getSelectedActionName(selectedAction)} has been applied to the event`)
        }
        else {
            toast.error('Error has occured while applying action to video. Please refresh and try again')
            setShowModal(false)
        }
    }

    const confirmIfHistory = () => {
        if (selectedAction == 0) {
            toast.error('Please select an action to apply')
            setShowModal(false)
            return
        }
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
            <div className='flex my-4 items-center'>
                <label className="mr-3 py-1 text-nowrap">Choose action:</label>
                <ActionDropdown actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction}></ActionDropdown>
            </div>
            <CommentInput comment={currentComment} setComment={setCurrentComment}></CommentInput>
            <ActionConfirmModal selectedAction={getSelectedActionName(selectedAction)} currentAction={currentActionName} showModal={showModal} setShowModal={setShowModalOnlyIfHistory} closeAndConfirm={()=>closeAndConfirm()} />
            <Button onClick={()=>confirmIfHistory()} variant="secondary" disabled={loading}>Confirm Action</Button>
        </div>
    )
}