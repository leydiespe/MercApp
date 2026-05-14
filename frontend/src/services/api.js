const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

export async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error)
    throw error
  }
}
