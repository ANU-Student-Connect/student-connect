// hooks/useSignup.js
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

export default function useSignup() {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    confirmedPassword,
  }) => {
    setLoading(true)

    // 1) Front-end validation
    if (!firstName || !lastName || !email || !password || !confirmedPassword) {
      const msg = 'All fields are required'
      toast.error(msg)
      setLoading(false)
      throw new Error(msg)
    }
    if (password !== confirmedPassword) {
      const msg = 'Passwords do not match'
      toast.error(msg)
      setLoading(false)
      throw new Error(msg)
    }
    if (password.length < 8) {
      const msg = 'Password must be at least 8 characters'
      toast.error(msg)
      setLoading(false)
      throw new Error(msg)
    }

    try {
      // 2) Call your API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',                // ensure cookies & CORS work
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmedPassword,
        }),
      })

      const data = await res.json()

      // 3) Bubble up server errors
      if (!res.ok) {
        const msg = data.message || 'Signup failed'
        toast.error(msg)
        throw new Error(msg)
      }

      // 4) Success: you can store & update context here
      localStorage.setItem('auth-user', JSON.stringify(data))
      setAuthUser(data)

      return data
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading }
}
