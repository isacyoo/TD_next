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
        const res = await clientFetch('POST', '/reset_api_key')
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
            <div className="font-bold text-xl my-6">Reset API Key</div>
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
                <div className="relative group mx-2">
                    <button onClick={handleCopy}><CiMedicalClipboard /></button>
                    <span className="absolute bottom-2 left-2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hoverMessage}</span>
                </div>
            </AlertDescription>
        </Alert>
    )
}