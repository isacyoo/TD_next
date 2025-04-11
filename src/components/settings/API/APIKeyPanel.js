"use client"

import { useState } from 'react'
import { clientFetch } from '@/util/clientApi'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CiMedicalClipboard } from "react-icons/ci";
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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

import { SettingsH2 } from "@/components/settings/SettingsHeaders"

export default function APIKeyPanel() {
    return (
        <div>
            <APIResetPanel />
        </div>
    )
}

function APIResetPanel() {
    const [ hoverMessage, setHoverMessage ] = useState("Click to copy to clipboard")
    const [ newApiKey, setNewApiKey ] = useState("")
    const [ expiryDate, setExpiryDate ] = useState("")
    const [ showModal, setShowModal ] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(newApiKey)
        setHoverMessage("Copied!")
        setTimeout(() => {
            setHoverMessage("Click to copy to clipboard")
        }, 2000)
    }

    const handleReset = async () => {
        setShowModal(false)
        const res = await clientFetch('POST', '/reset-api-key')
        if (res.ok) {
            const apiKey = await res.json()
            setNewApiKey(apiKey.api_key)
            setExpiryDate(apiKey.expiry_date)
        } else if (res.status == 401 || res.status == 403 || res.status == 422) {
            throw new Error(res.status)
        } else {
            alert("An error occurred. Please try again.")
        }
    }
    return (
        <div>
            <SettingsH2 mb={4}>Reset API Key</SettingsH2>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Reset API Key</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reset API Key</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to reset your API key? This will revoke your current API key and generate a new one.
                        </DialogDescription>
                    </DialogHeader>
                    <p>Are you sure you want to reset your API key?</p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="button" onClick={handleReset}>
                                Reset
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {newApiKey && <ShowAPIKey handleCopy={handleCopy} hoverMessage={hoverMessage} expiryDate={expiryDate}/>}
        </div>
    )
}

function ShowAPIKey({ handleCopy, hoverMessage, expiryDate }) {
    return (
        <Alert className="my-4">
            <AlertTitle>API Key reset</AlertTitle>
            <AlertDescription>Your API Key has been reset!</AlertDescription>
            <AlertDescription>The original API Key has been revoked</AlertDescription>
            <AlertDescription>The API key will be valid until {expiryDate}</AlertDescription>
            <AlertDescription className="flex items-center text-center">
                <div className="font-semibold">Copy to clipboard</div>
                <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger>
                        <Button size="icon" variant="link" onClick={handleCopy}>
                            <CiMedicalClipboard />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                        <span className="text-xs">{hoverMessage}</span>
                    </HoverCardContent>
                </HoverCard>
            </AlertDescription>
        </Alert>
    )
}