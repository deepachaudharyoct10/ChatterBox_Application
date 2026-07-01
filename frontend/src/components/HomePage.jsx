import React from 'react'
import  Sidebar  from './Sidebar'
import  MessageContainer  from './MessageContainer'

const HomePage = () => {
  return (
    <div className='sm:h-[450px] md:h-[550px] flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar></Sidebar>
      <MessageContainer></MessageContainer>
    </div>
  )
}
export  default HomePage
