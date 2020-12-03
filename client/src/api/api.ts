const baseURL = 'http://localhost:5000'
type payload = {
  kids: Array<number>
}

export const request = async (
  url: string,
  method = 'GET',
  body: string | null | payload = null,
  headers: any = {}
) => {
  try {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(baseURL + url, { method, body, headers })
    const data = await response.json()

    return data
  } catch (e) {
    throw new Error(e.message)
  }
}
