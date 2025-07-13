// This is a placeholder utility. Adjust based on your actual routing needs.
export function createPageUrl(path: string, params?: Record<string, string>): string {
  let url = `/${path}`
  if (params) {
    const searchParams = new URLSearchParams(params).toString()
    if (searchParams) {
      url += `?${searchParams}`
    }
  }
  return url
}
