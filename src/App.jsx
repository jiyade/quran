import React, { Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import FullScreenLoader from './components/FullScreenLoader'

const AppLayout = React.lazy(() => import('./pages/AppLayout'))
const Homepage = React.lazy(() => import('./pages/Homepage'))
const Juz = React.lazy(() => import('./pages/Juz'))
const Recitations = React.lazy(() => import('./pages/Recitations'))
const Reader = React.lazy(() => import('./pages/Reader'))
const JuzReader = React.lazy(() => import('./pages/JuzReader'))
const HizbReader = React.lazy(() => import('./pages/HizbReader'))

const App = () => {
    

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault()
        }

        const disablePinchZoom = (e) => {
            if (e.touches.length > 1) {
                e.preventDefault()
            }
        }

        document.addEventListener('touchmove', disablePinchZoom, {
            passive: false
        })
        document.addEventListener('contextmenu', handleContextMenu)

        return () => {
            document.removeEventListener('touchmove', disablePinchZoom)

            document.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [])

    

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<FullScreenLoader />}>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Navigate
                                    replace
                                    to='/quran/surah'
                                />
                            }
                        />
                        <Route
                            path='/quran'
                            element={<AppLayout />}
                        >
                            <Route
                                path='surah'
                                element={<Homepage />}
                            />
                            <Route
                                path='surah/:id'
                                element={<Reader />}
                            />
                            <Route
                                path='juz-hizb'
                                element={<Juz />}
                            />
                            <Route
                                path='juz-hizb/juz/:id'
                                element={<JuzReader />}
                            />
                            <Route
                                path='juz-hizb/hizb/:id'
                                element={<HizbReader />}
                            />

                            <Route
                                path='recitations'
                                element={<Recitations />}
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
            <Toaster
                position='bottom-center'
                containerClassName='mb-12'
            />
        </>
    )
}

export default App
