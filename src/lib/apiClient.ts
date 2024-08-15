import Cookies from 'js-cookie'

export const apiClient = async (url: string, options?: RequestInit) => {
  const token = Cookies.get('token')
  try {
    const response = await fetch('http://localhost:3000' + url, {
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

    return await response.json()
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}
