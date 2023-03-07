import React, { useEffect, useState } from 'react'
import { Link, useLocation  } from 'react-router-dom'
import './Navbar.scss'
import { useNavigate } from 'react-router-dom';

import newRequest from '../../utils/newRequest.js'

const Navbar = () => {

    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    const {pathname} = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }
    
    useEffect(() => {
        window.addEventListener('scroll', isActive)
        return () => {
            window.removeEventListener('scroll', isActive );
        }
    },[]);

    const currentUser =  JSON.parse(localStorage.getItem("currentUser"));


    const handlelogout = async () => {
        try{
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser", null);
            navigate("/")
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className={active || pathname !== "/" ? 'navbar active' : 'navbar'}>
                <div className="container">
            <div className="logo">
                <Link to="/" className='link'>
                <span className='text'>
                    fiverr
                </span>
                <span className='dot'>.</span>
                </Link>
            </div>
                
            <div className="links">
                <span>Fiverr Business</span>
                <Link to="/gigs" className="link">Explore</Link>
                <span>English</span>
                {!currentUser?.isSeller && 
                    <span>Become a seller</span>}
                    { !currentUser && <span onClick={() => navigate("/login")} >Sign in</span>}
                {!currentUser && <button onClick={() => navigate("/register")}>Join</button>}
                {
                    currentUser &&
                    <div className="user" onClick={() => setMenuActive((prevState) => !prevState)}>
                        <img src={currentUser.img || "/images/noavatar.png"} alt="" />
                        <span>{currentUser.username}</span>
                        {menuActive && <div className="options">
                            {
                                currentUser?.isSeller &&
                                (
                                    <>
                                    <Link to="/mygigs" className='link'>Gigs</Link >
                                    <Link to="/add" className='link'>Add new Gig</Link >
                                    </>
                                )
                            }
                            <Link to="/orders" className='link'>Orders</Link >
                            <Link to="/messages" className='link'>Messages</Link >
                            <Link onClick={handlelogout} className='link'>Logout</Link >
                            
                        </div>}
                    </div>
                }
            </div>
        </div>
        {(active ||  pathname !== "/")   && 
        <>
        <hr />
        <div className="menu">
            <Link to="/" className='link'>Graphic & Design</Link>
            <Link to="/" className='link'>Video & Animation</Link>
            <Link to="/" className='link'>Writing & Translation</Link>
            <Link to="/" className='link'>AI Services</Link>
            <Link to="/" className='link'>Digital Marketing</Link>
            <Link to="/" className='link'>Music & Audio</Link>
            <Link to="/" className='link'>Programming & Tech</Link>
            <Link to="/" className='link'>Business</Link>
            <Link to="/" className='link'>Lifestyle</Link>
            
        </div>
        <hr />
        </>
        }
    </div>
  )
}

export default Navbar