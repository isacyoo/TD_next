'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
    const [ loginFailed, setLoginFailed ] = useState(false)
    
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.id.value,
                password: event.target.password.value
            })
        }).then(
            (res) => {
                if (res.status === 201) {
                    router.push('/home')
                    router.refresh()
                } else {
                    setLoginFailed(true)
                    document.getElementById("login-form").reset()
                    document.getElementById("id").focus()
                }
            }
        )
    }
    return (
    <div className="my-20">
        <form id="login-form" className="m-5 max-w-lg bg-gray-400 p-20 rounded-3xl shadow-md flex flex-col items-center" onSubmit={e => handleSubmit(e)}>
            <h2 className="mb-5">Login</h2>
            <div className="id">
            <label className="mb-1 mr-3 font-bold" htmlFor="id">User ID:</label>
            <input className="p-2 mb-5 rounded-md border-white" type="text" id="id" name="id" placeholder="Enter your User ID" autoFocus></input>
            </div>
            <div className="password">
            <label className="mb-1 mr-3 font-bold" htmlFor="password">Password:</label>
            <input className="p-2 mb-5 rounded-md border-white"type="password" id="password" name="password" placeholder="Enter your Password"></input>
            </div>
            {loginFailed ? <p>Log in failed. Please try again.</p> : ""}
            <button className="rounded-md bg-blue-500 border-0 inline-block text-base font-medium py-3 px-4 text-center transition-all cursor-pointer align-baseline whitespace-nowrap select-none" type="submit">Login</button>
        </form>
    </div>
    )
}
    
