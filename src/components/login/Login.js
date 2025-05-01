'use client'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { useState } from 'react'


export default function Login() {    
    const router = useRouter()
    const [ loading, setLoading ] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
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
                    toast.error('Login failed. Please try again.')
                    document.getElementById("login-form").reset()
                    document.getElementById("id").focus()
                    setLoading(false)
                }
            }
        )
    }

    return (
        <Card className="my-40">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="login-form" className="m-5 p-10" onSubmit={e => handleSubmit(e)}>
                    <div className="mb-4">
                        <Label htmlFor="id">User ID:</Label>
                        <Input type="text" id="id" name="id" placeholder="Enter your User ID" autoFocus></Input>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password:</Label>
                        <Input type="password" id="password" name="password" placeholder="Enter your Password"></Input>
                    </div>
                    <Button type="submit" disabled={loading}>Login</Button>
                </form>
            </CardContent>
        </Card>
    )
}
    
