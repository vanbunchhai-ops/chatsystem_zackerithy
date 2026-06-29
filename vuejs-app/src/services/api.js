const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

async function request(path, options = {}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.message || Object.values(data.errors || {}).flat().join(' ') || 'Request failed'
    throw new Error(message)
  }

  return data
}

export function signup(payload) {
  return request('/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function signin(payload) {
  return request('/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function signout(token) {
  return request('/signout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function verify(token) {
  return request('/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}