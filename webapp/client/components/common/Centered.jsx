import React from 'react'
import PropTypes from 'prop-types'

const Centered = ({ children }) => {
  return (
    <div className='flex justify-center h-full'>
      <div className='flex flex-col justify-center'>
        {children}
      </div>
    </div>
  )
}

Centered.propTypes = {
  children: PropTypes.object
}

export default Centered
