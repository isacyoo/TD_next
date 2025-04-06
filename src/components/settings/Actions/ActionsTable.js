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
import { toast } from "sonner"


export default function ActionsTable({ actions }) {
    const [ allActions, setAllActions ] = useState(actions)

    const router = useRouter()

    const handleToggle = (index) => {
        const updatedActions = allActions.map((action, i) => {
            if (i == index) {
                return { ...action, is_enabled: !action.is_enabled }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleNameChange = (index, name) => {
        const updatedActions = allActions.map((action, i) => {
            if (i == index) {
                return { ...action, name }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleIsTailgatingChange = (index) => {
        const updatedActions = allActions.map((action, i) => {
            if (i == index) {
                return { ...action, is_tailgating: !action.is_tailgating }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleDelete = (index) => {
        if (allActions[index].id == null) {
            const updatedActions = allActions.filter((_, i) => i !== index)
            setAllActions(updatedActions)
            return
        }
        const updatedActions = allActions.map((action, i) => {
            if (i == index) {
                return { ...action, is_deleted: true }
            }
            return action
        })
        setAllActions(updatedActions)
    }

    const handleUpdateActions = () => {
        const hasEmptyName = allActions.some(action => action.name === "")
        const hasDuplicateName = allActions.some((action, index) => allActions.findIndex(a => a.name === action.name && !a.is_deleted) !== index && !action.is_deleted)
        
        if (hasEmptyName) {
            toast.error("Action name cannot be empty")
            return
        }
        
        if (hasDuplicateName) {
            toast.error("Action name must be unique")
            return
        }
        post('/update_actions', { actions: allActions }).then((res) => {
        
            if (res.ok) {
                toast.success("Actions updated")
            } else {
                toast.error("Failed to update actions. Please try again")
            }
        })
    }

    const addAction = () => {
        const newAction = {
            id: null,
            name: "",
            is_tailgating: false,
            is_enabled: true,
            is_deleted: false
        }
        setAllActions([...allActions, newAction])
    }

    return (
        <div>
            <Table>
                <ActionTableHeader />
                <TableBody>
                    {allActions.map((action, i) => (
                        action.is_deleted ? null :
                        <ActionRow 
                            key={i} 
                            action={action}
                            index={i} 
                            handleNameChange={handleNameChange} 
                            handleIsTailgatingChange={handleIsTailgatingChange} 
                            handleToggle={handleToggle}
                            handleDelete={handleDelete}
                        />
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between my-4">
                <Button onClick={() => addAction()}variant="secondary">Add</Button>
                <Button onClick={() => handleUpdateActions()}>Save</Button>
            </div>
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
    

function ActionRow({ action, index, handleNameChange, handleIsTailgatingChange, handleToggle, handleDelete }) {
    return (
        <TableRow>
            <TableCell>{action.id}</TableCell>
            <TableCell><Input value={action.name} onChange={(e) => handleNameChange(index, e.target.value)}></Input></TableCell>
            <TableCell><Checkbox checked={action.is_tailgating ? true : false} onCheckedChange={(e) => handleIsTailgatingChange(index)}></Checkbox></TableCell>
            <TableCell><ToggleEnable action={action} index={index} handleToggle={handleToggle}/></TableCell>
            <TableCell><DeleteButton index={index} handleDelete={handleDelete}/></TableCell>
        </TableRow>
    )
}

function ToggleEnable({ action, index, handleToggle }) {
    return (        
        <div className="inline-flex items-center cursor-pointer">
            <Checkbox checked={action.is_enabled ? true : false} onCheckedChange={() => handleToggle(index)}></Checkbox>
        </div>
        )
    }

function DeleteButton({ index, handleDelete }) {
    return (
        <Button size="sm" onClick={() => handleDelete(index)}>Delete</Button>
    )
}