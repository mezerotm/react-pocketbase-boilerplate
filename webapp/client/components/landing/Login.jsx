import React, { useState } from 'react'
import PropTypes from 'prop-types'
import pb from '@config/pocketbase'
import { useForceUpdate } from '@libs/hooks'

const DEFAULT_FORM = {
  email: '',
  password: ''
}

const controller = () => {
  const forceUpdate = useForceUpdate()

  const [form, setForm] = useState(DEFAULT_FORM)
  const [isLoginVisable, setIsLoginVisable] = useState(false)

  const loginUser = async ({ email, password }) => {
    try {
      await pb.collection('users').authWithPassword(
        email,
        password
      )
      forceUpdate()
    } catch (e) {
      if (e.status === 400) {
        let message = ''

        if (e.data.data.email) {
          message += `email: ${e.data.data.email.message} \n`
        }

        if (e.data.data.password) {
          message += `password: ${e.data.data.password.message}`
        }

        if (message === '') message = e.data.message

        window.alert(message)
        return false
      }
      window.alert(e.data.message)
      return false
    }
    return true
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    loginUser(form)
    setForm(DEFAULT_FORM)
  }

  const handleInputChange = e => {
    setForm({ ...form, [e.key]: e.value })
  }

  const handleCancel = () => {
    setForm(DEFAULT_FORM)
  }

  const handleLoginCancel = () => {
    setIsLoginVisable(false)
  }

  return {
    handleFormSubmit,
    handleInputChange,
    handleCancel,
    handleLoginCancel,
    isLoginVisable,
    setIsLoginVisable,
    loginUser,
    form
  }
}

const Login = ({ onCancel }) => {
  const {
    handleFormSubmit,
    handleInputChange,
    handleCancel,
    form
  } = controller()

  return (
    <div>
      <h1>Login Page</h1>
      <p><span className='text-gray-500 font-xs'>Don&apos;t have an account?</span> <a onClick={() => { handleCancel(); onCancel() }} className='text-blue-600 underline cursor-pointer'>Sign up</a></p>
      <form onSubmit={handleFormSubmit}>
        <label>
          email:
          <input name='email' value={form.email} onChange={e => handleInputChange({ key: 'email', value: e.target.value })} type='email' />
        </label>
        <label>
          password:
          <input name='password' value={form.password} onChange={e => handleInputChange({ key: 'password', value: e.target.value })} type='password' />
        </label>
        <input type='submit' />
      </form>
    </div>
  )
}

Login.propTypes = {
  onCancel: PropTypes.func
}

export { controller }
export default Login
