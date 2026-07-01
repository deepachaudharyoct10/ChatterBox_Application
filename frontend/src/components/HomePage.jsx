import React from 'react'
import  Sidebar  from './Sidebar'
import  MessageContainer  from './MessageContainer'

const HomePage = () => {
  return (
    <div className='h-screen w-full sm:h-[600px] sm:w-full sm:max-w-4xl flex rounded-none sm:rounded-lg overflow-hidden bg-base-100/90 shadow-xl border border-base-300'>
      <Sidebar></Sidebar>
      <MessageContainer></MessageContainer>
    </div>
  )
}
export  default HomePage
