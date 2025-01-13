import React from 'react'

const Button = ({name}) => {
  return (
    <button className='px-4 py-2 font-lg bg-gray-300 rounded-lg m-2  dark:bg-[rgb(60,60,60)] dark:text-white'> {name}</button>
  )
}

export default Button;