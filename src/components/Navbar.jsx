import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-100 p-3 '>
      <div className="itask font-bold text-xl">itask</div>
      <ul className="flex gap-2">
        <li>Home</li>
        <li>About</li>
      </ul>
    </nav>
  )
}

export default Navbar
