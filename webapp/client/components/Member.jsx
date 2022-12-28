import React from 'react'
import pb from '@config/pocketbase'
import { useForceUpdate } from '@libs/hooks'

const controller = () => {
  const forceUpdate = useForceUpdate()

  const logout = () => {
    pb.authStore.clear()
    forceUpdate()
  }

  return {
    logout
  }
}

const Dashboard = () => {
  const {
    logout
  } = controller()

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
