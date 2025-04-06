"use client"

import { useState } from 'react'
import { clientFetch } from '@/util/clientApi'
import { useRouter } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


export default function HighRiskMembersTable({ members }) {
    const [ allMembers, setAllMembers ] = useState(members)

    const handleMemberIdChange = (index, memberId) => {
        const updatedMembers = allMembers.map((member, i) => {
            if (i == index) {
                return { ...member, member_id: memberId }
            }
            return member
        })
        setAllMembers(updatedMembers)
    }

    const handleDelete = (index) => {
        if (allMembers[index].id == null) {
            const updatedMembers = allMembers.filter((_, i) => i !== index)
            setAllMembers(updatedMembers)
            return
        }
        const updatedMembers = allMembers.map((member, i) => {
            if (i == index) {
                return { ...member, is_deleted: true }
            }
            return member
        })
        setAllMembers(updatedMembers)
    }

    const handleUpdateMembers = () => {
        const hasEmptyMemberId = allMembers.some(member => member.member_id === "")
        const hasDuplicateMemberId = allMembers.some((member, index) => allMembers.findIndex(m => (m.member_id === member.member_id && !m.is_deleted)) !== index && !member.is_deleted)
        
        if (hasEmptyMemberId) {
            toast.error("Member ID cannot be empty")
            return
        }
        if (hasDuplicateMemberId) {
            toast.error("Duplicate Member IDs are not allowed")
            return
        }

        clientFetch('POST', "/update_high_risk_members", { members: allMembers })
            .then(res => {
                if (res.ok) {
                    toast.success("High risk members updated successfully")
                } else {
                    toast.error("Error updating high risk members")
                }
            })
    }

    const addMember = () => {
        const newMember = {
            id: null,
            member_id: "",
            is_deleted: false,
            created_at: null
        }
        setAllMembers([...allMembers, newMember])
    }

    return (
        <div className="flex flex-col gap-4">
            <Table>
                <HighRiskMemberTableHeader />
                <TableBody>
                    {allMembers.map((member, index) => (
                        member.is_deleted ? null :
                        <HighRiskMemberTableRow
                            key={index}
                            member={member}
                            index={index}
                            handleMemberIdChange={handleMemberIdChange}
                            handleDelete={handleDelete}
                        />
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between my-4">
                <Button onClick={addMember} variant="secondary">Add</Button>
                <Button onClick={handleUpdateMembers}>Update Members</Button>
            </div>
            
        </div>
    )
}

function HighRiskMemberTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Member ID</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
    )
}

function HighRiskMemberTableRow({ member, index, handleMemberIdChange, handleDelete }) {
    return (
        <TableRow key={index}>
            <TableCell>
                <Input
                    value={member.member_id}
                    onChange={(e) => handleMemberIdChange(index, e.target.value)}
                    placeholder="Enter Member ID"
                />
            </TableCell>
            <TableCell>
                <Button size="sm" onClick={() => handleDelete(index)}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}