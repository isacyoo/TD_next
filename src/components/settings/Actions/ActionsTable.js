"use client"

import { useState } from 'react'
import { post } from '@/util/clientApi'
import { useRouter } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function ActionsTable({ actions }) {
    const [ allActions, setAllActions ] = useState(actions)

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

    const handleDelete = (id) => {
        const updatedActions = allActions.map(action => {
            if (action.id === id) {
                return { ...action, is_deleted: true }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleUpdateActions = (updatedActions) => {
        const hasEmptyName = updatedActions.some(action => action.name === "")
        const hasDuplicateName = updatedActions.some((action, index) => updatedActions.findIndex(a => a.name === action.name) !== index)
        
        if (hasEmptyName) {
            alert("Action name cannot be empty")
            return
        }
        
        if (hasDuplicateName) {
            alert("Action name must be unique")
            return
        }
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
            <Table>
                <ActionTableHeader />
                <TableBody>
                    {allActions.map(action => (
                        action.is_deleted ? null :
                        <ActionRow 
                            key={action.id} 
                            action={action} 
                            handleNameChange={handleNameChange} 
                            handleIsTailgatingChange={handleIsTailgatingChange} 
                            handleToggle={handleToggle}
                            handleDelete={handleDelete}
                        />
                    ))}
                </TableBody>
            </Table>
            <Button onClick={() => handleUpdateActions(allActions)} className="my-4">Save</Button>
        </div>
    )
}

function ActionTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Is Tailgating</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
    )
}
    

function ActionRow({ action, handleNameChange, handleIsTailgatingChange, handleToggle, handleDelete }) {
    return (
        <TableRow>
            <TableCell>{action.id}</TableCell>
            <TableCell><Input value={action.name} onChange={(e) => handleNameChange(action.id, e.target.value)}></Input></TableCell>
            <TableCell><Checkbox checked={action.is_tailgating ? true : false} onCheckedChange={(e) => handleIsTailgatingChange(action.id)}></Checkbox></TableCell>
            <TableCell><ToggleEnable action={action} handleToggle={handleToggle}/></TableCell>
            <TableCell><DeleteButton action={action} handleDelete={handleDelete}/></TableCell>
        </TableRow>
    )
}

function ToggleEnable({ action, handleToggle }) {
    return (        
        <div className="inline-flex items-center cursor-pointer">
            <Checkbox checked={action.is_enabled ? true : false} onCheckedChange={() => handleToggle(action.id)}></Checkbox>
        </div>
        )
    }

function DeleteButton({ action, handleDelete }) {
    return (
        <Button size="sm" onClick={() => handleDelete(action.id)}>Delete</Button>
    )
}