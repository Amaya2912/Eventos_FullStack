import axios from "axios"
import type {RegisterFormData } from "../types/schemas"

type authData  = RegisterFormData

export async function login({ email, password }: Pick<authData, 'email' | 'password'>) {
  try {
    const response = await axios.post('/api/login', { email, password })
    return response.data
  } catch {
    throw new Error('Login failed')
  }
}

export async function register({ name, email, password }: authData) {
  try {
    const response = await axios.post('/api/register', { name, email, password })
    return response.data
  } catch {
    throw new Error('Registration failed')
  }
}
