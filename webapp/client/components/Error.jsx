import React from 'react'
import { useRouteError } from 'react-router-dom'

const controller = () => {
  const error = useRouteError

  const handleTryAgain = () => {
    window.location.reload()
  }

  return {
    error,
    handleTryAgain
  }
}

const Error = () => {
  const {
    error,
    handleTryAgain
  } = controller()

  return (
    <div className='flex justify-center h-full'>
      <div className='flex flex-col justify-center'>
        <div className='flex p-4 bg-white rounded drop-shadow-xl'>
          <h2 className='text-2xl font-bold'>There was an error</h2>
          <p>{error.statusText || error.message}</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      </div>
    </div>
  )
}

export default Error
