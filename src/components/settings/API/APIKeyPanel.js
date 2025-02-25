"use client"

import { useState } from 'react'
import { post } from '@/util/clientApi'

export default function APIKeyPanel({ apiKey }) {
    const [ hoverMessage, setHoverMessage ] = useState("Click to copy to clipboard")
    const [ currentApiKey, setCurrentApiKey ] = useState(apiKey)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(currentApiKey)
        setHoverMessage("Copied!")
        setTimeout(() => {
            setHoverMessage("Click to copy to clipboard")
        }, 2000)
    }

    return (
        <div>
            <div className="flex items-center relative group">
                <h2>API Key</h2>
                <p>******</p>
                <button onClick={handleCopy}>o</button>
                <span className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hoverMessage}</span>
            </div>
            <APIResetPanel setCurrentApiKey={setCurrentApiKey}/>
        </div>
    )
}

function APIResetPanel({ setCurrentApiKey }) {
    const [ resMessage, setResMessage ] = useState("")
    const handleReset = async () => {
        const res = await post('/reset_api_key')
        if (res.ok) {
            const apiKey = await res.json()
            setCurrentApiKey(apiKey.api_key)
            setResMessage(apiKey.msg)
        } else {
            setResMessage("An error occurred while resetting the API key")
        }
    }
    return (
        <div>
            <h2>Reset API Key</h2>
            <button onClick={handleReset}>Reset</button>
            <p>{resMessage}</p>

        </div>
    )
}

