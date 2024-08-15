import { cookies } from 'next/headers'

export const apiClient = async (url: string, options?: RequestInit) => {
  const token = cookies().get('token') 
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options?.headers || {}),
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}
