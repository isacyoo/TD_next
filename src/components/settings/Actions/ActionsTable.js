"use client"

import { useState } from 'react'
import { post } from '@/util/clientApi'
import { useRouter } from 'next/navigation'

export default function ActionsTable({ actions }) {
    const [ allActions, setAllActions ] = useState(actions)
    const [ showModal, setShowModal ] = useState(false)
    const [ deleteActionId, setDeleteActionId ] = useState(null)

    const router = useRouter()

    const handleToggle = (id) => {
        const updatedActions = allActions.map(action => {
            if (action.id === id) {
                return { ...action, is_enabled: !action.is_enabled }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleNameChange = (id, name) => {
        const updatedActions = allActions.map(action => {
            if (action.id === id) {
                return { ...action, name }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleIsTailgatingChange = (id) => {
        const updatedActions = allActions.map(action => {
            if (action.id === id) {
                return { ...action, is_tailgating: !action.is_tailgating }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleDelete = (id, setShowModal) => {
        post(`/delete_action/${id}`).then((res) => {
            if (res.ok) {
                const updatedActions = allActions.filter(action => action.id !== id)
                setAllActions(updatedActions)
                setShowModal(false)
            } else if (res.status === 400) {
                res.json().then((data) => {
                    if (data.msg == "Action has associated events") {
                        alert(data.msg + ". Please delete associated events first.")
                    } else {
                        alert("Delete action failed")
                    }
                    setShowModal(false)
                }
            )
            } else if (res.status === 404) {
                alert("Action not found")
                setShowModal(false)
            } else {
                throw new Error(res.status)
            }
        })
    }

    const handleUpdateActions = (updatedActions) => {
        post('/update_actions', { actions: updatedActions }).then((res) => {
            if (res.ok) {
                alert("Actions updated")
                router.refresh()
            } else {
                throw new Error(res.status)
            }
        })
    }

    return (
        <div>
            <table>
                <ActionTableHeader />
                <tbody>
                    {allActions.map(action => (
                        <ActionRow 
                            key={action.id} 
                            action={action} 
                            handleNameChange={handleNameChange} 
                            handleIsTailgatingChange={handleIsTailgatingChange} 
                            handleToggle={handleToggle}
                            setShowModal={setShowModal}
                            setDeleteActionId={setDeleteActionId}
                        />
                    ))}
                </tbody>
            </table>
            {showModal ? <Modal actionId={deleteActionId} setShowModal={setShowModal} handleDelete={handleDelete}/> : <></>}
            <button onClick={() => handleUpdateActions(allActions)} className="bg-primary-200 p-2 rounded-xl">Save</button>
        </div>
    )
}

function ActionTableHeader() {
    return (
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Is Tailgating</th>
                <th>Enable/Disable</th>
                <th>Delete</th>
            </tr>
        </thead>
    )
}
    

function ActionRow({ action, handleNameChange, handleIsTailgatingChange, handleToggle, setShowModal, setDeleteActionId }) {
    return (
        <tr>
            <td>{action.id}</td>
            <td><input value={action.name} onChange={(e) => handleNameChange(action.id, e.target.value)}></input></td>
            <td><input type="checkbox" checked={action.is_tailgating ? true : false} onChange={(e) => handleIsTailgatingChange(action.id)}></input></td>
            <td><ToggleEnable action={action} handleToggle={handleToggle}/></td>
            <td><DeleteButton action={action} setShowModal={setShowModal} setDeleteActionId={setDeleteActionId}/></td>
        </tr>
    )
}

function ToggleEnable({ action, handleToggle }) {
    return (        
        <div className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={action.is_enabled ? true : false} onChange={() => handleToggle(action.id)}></input>
        </div>
        )
    }

function DeleteButton({ action, setShowModal, setDeleteActionId }) {
    return (
        <button className="bg-primary-200 p-2 rounded-xl" onClick={() => {
            setShowModal(true)
            setDeleteActionId(action.id)
        }}>Delete</button>
    )
}

function Modal({ actionId, setShowModal, handleDelete }) {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-primary-900 bg-opacity-50 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary-100 outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-primary-200 rounded-t">
                        <h3 className="text-xl font-semibold">
                            Are you sure you want to delete this action?
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
                        <h3 className="font-semibold">This cannot be undone</h3>
                        <button className="bg-primary-200 p-2 rounded-xl" onClick={() => handleDelete(actionId, setShowModal)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}