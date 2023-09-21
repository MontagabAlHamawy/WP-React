import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import Navbar from '../common/Navbar';
import Post from './Post';
import Login from './Login';
import AddPost from './AddPost';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute'
import Wait from '../common/Wait';

function Pages() {
    const authUser = useSelector((state) => state.auth.user)
    return (
        <>
            <Navbar authUser={authUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Posts />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute authUser={authUser} />}>
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/profile" element={<div>profile page </div>} />
                </Route>
            </Routes>
            
        </>
    )
}

export default Pages
