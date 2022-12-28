import React from 'react'
import Login, { controller as loginController } from './Login'
import Signup from './Signup'

const Landing = () => {
  const {
    isLoginVisable,
    handleLoginCancel,
    setIsLoginVisable
  } = loginController()

  return (
    <div>
      {
        isLoginVisable
          ? <Login onCancel={handleLoginCancel} />
          : <Signup isLoginVisable={e => setIsLoginVisable(e)} />
      }
    </div>
  )
}

export default Landing
