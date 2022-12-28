import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, useReloadBrowserWindow, useUser } from '@libs/hooks'
import { Member, ConfirmEmail, Landing } from '@components'
import pkjson from '../package.json'
import { selectGlobal } from '@store/global'
import { useSelector } from 'react-redux'
import { persistor } from '@store'
import pb from '@config/pocketbase'
import toast, { Toaster } from 'react-hot-toast'

const controller = () => {
  const globalStore = useSelector(selectGlobal)
  const reloadBrowserWindow = useReloadBrowserWindow()
  const user = useUser()

  const firstRender = useRef(false)

  useEffect(() => {
    if (firstRender.current) return
    if (globalStore.appVersion !== pkjson.version) {
      firstRender.current = true
      handleVersionDifference()
    }
  }, [])

  const handleVersionDifference = async () => {
    const update = async () => {
      await persistor.purge()
      pb.authStore.clear()
      reloadBrowserWindow()
    }

    const updateToast = toast(
      <div className='flex space-y-4'>
        <p className='text-lg font-bold text-center'>New version detected!</p>
        <div className='flex justify-center'>
          <div className='flex flex-col space-x-2'>
            <button className='bg-blue-500' onClick={update}>Update</button>
            <button onClick={() => toast.dismiss(updateToast)}>Dismiss</button>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='text-sm font-bold text-red-500'>This will log you out</div>
        </div>
      </div>,
      {
        duration: Infinity
      }
    )
  }

  return {
    user
  }
}

const App = () => {
  const {
    user
  } = controller()

  const membersRoute = () => (
    <Route element={<ProtectedRoute accessLevel='member' />}>
      {
        !user.verified
          ? <Route element={<ConfirmEmail />} path='/' />
          : <Route element={<Member />} path='/' />
      }
    </Route>
  )

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {
            user
              ? membersRoute()
              : <Route element={<Landing />} path='/' />
          }
        </Routes>
      </Router>
    </>
  )
}

export default App

// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from 'react-router-dom'
// import * as pages from '@components/pages'
// import { RequireAuth, AuthProvider, useReloadBrowserWindow } from '@libs/hooks'
// import emitter from '@config/eventsEmitter'
// import { useEffect } from 'react'
// import pb from '@config/pocketbase'

// function App() {
//   const reloadBrowserWindow = useReloadBrowserWindow()

//   useEffect(() => {
//     emitter.on('saga.takeLatest.logout', handleLogout)

//     return () => {
//       emitter.removeListener('saga.takeLatest.logout', handleLogout)
//     }
//   }, [])

//   const handleLogout = () => {
//     pb.authStore.clear()
//     reloadBrowserWindow()
//   }

//   return (
//     <pages.Error>
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path='/home' element={<pages.Landing />} />
//             <Route path='/signup' element={<pages.Signup />} />
//             <Route path='/login' element={<pages.Login />} />
//             <Route
//               path='/' element={
//                 <RequireAuth>
//                   <pages.Dashboard />
//                 </RequireAuth>
//               }
//             />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </pages.Error>
//   )
// }

// export default App
