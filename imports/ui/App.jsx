import React from 'react';
import FormUsers from './FormUsers.jsx';
import UsersTable from './UsersTable.jsx';
import Probanding from './dropDown.jsx'
import Example from './Example.jsx';

export const App = () => (
  <div id="react-target" className='flex flex-col  bg-gray-200 m-0 p-0 min-h-screen w-full'>
      <img className='flex justify-center w-1/5 self-center'  src='https://firebasestorage.googleapis.com/v0/b/e-commerce-8cdcd.appspot.com/o/icon.png?alt=media&token=7d1361ee-f3b2-40e0-a6ed-892246aeac6a' alt='logo-imag' />
  <FormUsers />
  <UsersTable />
  {/* <Probanding />     */}
  {/* <Example /> */}
  </div>

)
