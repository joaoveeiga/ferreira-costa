import { useContext } from 'react'
import { APIProvider } from '../providers'

export default function useAPI() {
  const context = useContext(APIProvider.Context)

  if (!context) {
    throw new Error('This hook must be wrapped by APIProviderContext')
  }

  return context
}