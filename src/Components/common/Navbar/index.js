import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux/slice/authSlice';

function Navbar({authUser}) {
    // const auth = localStorage.getItem('user');
    const dispatch = useDispatch()
    // const authUser = useSelector((state) => state.auth.user)
    console.log('auth', authUser);
    return (
        <div className='p-5 flex justify-between items-center ' style={{ background: "#eeeeee" }}>
            <div>
                <Link to='/' className='text-2xl font-semibold'>WR-Blog</Link>
            </div>
            <ul className='flex gap-5 justify-end items-center'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/blog'>Blog</Link></li>
                {!authUser?.token ? (
                    <>
                        <li><Link to='/login' className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:bg-blue-500 disabled:text-slate-100 disabled:cursor-wait'>LogIn</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/add-Post'>Add Post</Link></li>
                        <li><Link to='/profile' style={{ textDecoration: "underline" }}>{authUser.user_display_name}</Link></li>
                        <li><button className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:bg-blue-500 disabled:text-slate-100 disabled:cursor-wait' onClick={() => { dispatch(logout()) }}>LogOut</button></li>
                    </>
                )}

            </ul>

        </div>
    )
}

export default Navbar
