import { useContext } from "react"
import { ListUsersContext } from "./../providers"

export const useListUsers = () => {
  const context = useContext(ListUsersContext)

  if (!context) {
    throw new Error(
      "This hook must be wrapped by ListUsersContext"
    )
  }

  return context
}