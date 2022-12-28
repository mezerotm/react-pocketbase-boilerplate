import React from 'react'
import { useQuery } from '@tanstack/react-query'
import pb from '@config/pocketbase'
import { useUser } from '@libs/hooks'

const controller = () => {
  const user = useUser()

  const fetchRequestVerification = async email => {
    return await pb.collection('users').requestVerification(email)
  }

  const email = user.email
  const requestVerification = useQuery({ queryKey: ['fetchRequestVerification', email], queryFn: () => fetchRequestVerification(email) })

  return {
    requestVerification,
    user
  }
}

const ConfirmEmail = () => {
  const {
    requestVerification,
    user
  } = controller()

  return (
    <div>
      <h1>Confirm your email address</h1>
      <p>We sent an email to {user.email}</p>
      <p className='text-xs text-gray-400'>Didn&apos;t receive the email? <a onClick={() => requestVerification.refetch()} className='text-blue-500 underline cursor-pointer'>Click here to send it again</a></p>
      {
        requestVerification.status === 'loading' && requestVerification.fetchStatus === 'idle'
          ? <div>Idle</div>
          : requestVerification.fetchStatus === 'fetching'
            ? <div>Loading</div>
            : requestVerification.status === 'error'
              ? <div>{requestVerification.error}</div>
              : requestVerification.status === 'success'
                ? <div>Sent</div>
                : requestVerification.fetchStatus === 'paused'
                  ? <div>Network Error</div>
                  : <div>Unkown Error</div>
      }
    </div>
  )
}

export default ConfirmEmail
