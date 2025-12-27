const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:8000'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.detail || 'Something went wrong', response.status)
    }

    return data
  },

  // Auth endpoints
  register: (userData) => api.request('/auth/register', {
    method: 'POST',
    body: userData,
  }),

  login: (credentials) => api.request('/auth/login', {
    method: 'POST',
    body: credentials,
  }),

  // Expense endpoints
  addExpense: (expenseData) => api.request('/expense/add-expense', {
    method: 'POST',
    body: expenseData,
  }),

  getExpenses: (userId, month, year) => 
    api.request(`/expense/?user_id=${userId}&month=${month}&year=${year}`),

  updateExpense: (expenseId, updates) => api.request(`/expense/edit-expenses/${expenseId}`, {
    method: 'PATCH',
    body: updates,
  }),

  deleteExpense: (expenseId) => api.request(`/expense/delete-expenses/${expenseId}`, {
    method: 'DELETE',
  }),
}

export { api, ApiError }