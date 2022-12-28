import React from 'react'
import pkjson from '../../package.json'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center h-14 bg-white drop-shadow-2xl'>
      <p className='text-center text-gray-500'>
        Copyright © <span className='font-sans font-medium text-orange-500 no-underline'>React Pocketbase Boilerplate</span>
      </p>
      <span className='text-xs text-center text-gray-500'>v{pkjson.version}</span>
    </div>
  )
}

export default Footer
