'use client'
import { useState } from 'react'
import ActionDropdown from "./ActionDropdown"
import ActionConfirmModal from './ActionConfirmModal'
import { usePathname, useRouter } from 'next/navigation'
import { post } from '@/util/clientApi'

export default function ActionContainer({ actions, currentAction }) {
    const [ selectedAction, setSelectedAction ] = useState(0)
    const [ showModal, setShowModal ] = useState(false)
    const [ actionConfirmed, setActionConfirmed ] = useState(false)
    const pathName = usePathname()
    const router = useRouter()
    const videoId = pathName.split('/').slice(-1)[0]

    const applyActionToVideo = async (videoId, actionId) => {
        const res = await post(`/api/action_to_video/${videoId}/${actionId}`)

        return res.status
    }

    const closeAndConfirm = async () => {
        const actionId = actions[selectedAction].id
        const res = await applyActionToVideo(videoId, actionId)
        if (res == 201) {
            setActionConfirmed(true)
            setShowModal(false)
        }
        else if (res == 401 || res == 403 || res == 422) {
            alert("Session has expired. Please log in again")
            router.push('/login')
        }
        else {
            alert('Error has occured while applying action to video. Please refresh and try again')
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
    return (
        <div className="my-5 mx-0 flex flex-col items-center">
            { currentAction && !actionConfirmed ? <p className="text-center font-bold">Current action: {currentAction}</p> : "" }
            { actionConfirmed ? <p className="text-center font-bold">Action has been updated</p> : "" }
            <div className='flex my-4'>
                <label className="mr-3 py-1">Choose actions:</label>
                <ActionDropdown actions={actions} selectedAction={selectedAction} setSelectedAction={setSelectedAction}></ActionDropdown>
            </div>
            { showModal ? <ActionConfirmModal selectedAction={actions[selectedAction].name} currentAction={currentAction} closeAndCancel={()=>setShowModal(false)} closeAndConfirm={()=>closeAndConfirm()}></ActionConfirmModal> : ''}
            <button onClick={()=>confirmIfHistory()} className="py-3 px-5 bg-primary-700 border-none rounded cursor-pointer mr-1 text-primary-200">Confirm Action</button>
        </div>
    )
}