import Login from '@/components/login/Login.js'
import { redirect } from 'next/navigation'
import { getSession } from '@/util/api'


export default async function LoginPage() {
	await getSession().then(
    (res) => {
      if (res.ok) {
        redirect('/home')
      }
    }
  )

  return (
	  <Login/>
  )
}