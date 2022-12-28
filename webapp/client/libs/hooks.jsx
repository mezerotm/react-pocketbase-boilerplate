import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { Landing } from '@components'
import { useQuery } from '@tanstack/react-query'
import pb from '@config/pocketbase'
import { REFRESH_RATE } from '@libs/utils'

export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  return forceUpdate
}

export const useReloadBrowserWindow = () => {
  return () => {
    window.location.reload()
  }
}

export const ProtectedRoute = ({ accessLevel }) => {
  switch (accessLevel) {
    case 'member':
      return (
        pb.authStore.token
          ? <Outlet />
          : <Landing />
      )
  }
}

ProtectedRoute.propTypes = {
  accessLevel: PropTypes.string
}

export const useUser = () => {
  const [user, setUser] = useState(pb.authStore.model)

  const fetchAuthRefresh = async () => {
    return await pb.collection('users').authRefresh()
  }

  const isValid = pb.authStore.isValid
  useQuery({ queryKey: ['fetchAuthRefresh', isValid], queryFn: fetchAuthRefresh, refetchInterval: REFRESH_RATE, enabled: isValid, refetchIntervalInBackground: isValid })

  pb.authStore.onChange(() => {
    setUser(pb.authStore.model)
  })

  return user
}
