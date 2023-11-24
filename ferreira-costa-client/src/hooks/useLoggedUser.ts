import { useContext } from "react"
import { LoggedUserContext } from "./../providers"

export const useLoggedUser = () => {
  const context = useContext(LoggedUserContext)

  if (!context) {
    throw new Error(
      "This hook must be wrapped by LoggedUserContext"
    )
  }

  return context
}