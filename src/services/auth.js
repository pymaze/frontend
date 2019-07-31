export const isBrowser = () => typeof window !== "undefined"

export const isLoggedIn = () => {
  if (isBrowser() && window.localStorage.getItem("py-maze-jwt") !== null) {
    return true
  } else {
    return false
  }
}

export const logout = callback => {
  window.localStorage.removeItem("py-maze-jwt")
  callback()
}
