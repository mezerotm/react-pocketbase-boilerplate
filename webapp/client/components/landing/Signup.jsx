import React, { useState } from 'react'
import PropTypes from 'prop-types'
import pb from '@config/pocketbase'
import { controller as loginController } from './Login'

const DEFAULT_FORM = {
  email: '',
  password: ''
}

const controller = () => {
  const [form, setForm] = useState(DEFAULT_FORM)

  const {
    loginUser
  } = loginController()

  const createUser = async ({ email, password }) => {
    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        emailVisibility: true
      })
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

    const isLoggedIn = loginUser({ email, password })

    return isLoggedIn
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    createUser(form)
    setForm(DEFAULT_FORM)
  }

  const handleInputChange = e => {
    setForm({ ...form, [e.key]: e.value })
  }

  return {
    handleFormSubmit,
    handleInputChange,
    form
  }
}

const Signup = ({ isLoginVisable }) => {
  const {
    handleFormSubmit,
    handleInputChange,
    form
  } = controller()

  return (
    <div>
      <h1>Signup Page</h1>
      <p><span className='text-gray-500 font-xs'>Already have an account?</span> <a onClick={() => isLoginVisable(true)} className='text-blue-600 underline cursor-pointer'>Log In</a></p>
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

Signup.propTypes = {
  isLoginVisable: PropTypes.func
}

export default Signup
