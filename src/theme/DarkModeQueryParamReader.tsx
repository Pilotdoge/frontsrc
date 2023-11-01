import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../state'
import { updateUserDarkMode } from '../state/user/actions'

export default function DarkModeQueryParamReader(): null {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
      dispatch(updateUserDarkMode({ userDarkMode: true }))
  }, [dispatch])

  return null
}
