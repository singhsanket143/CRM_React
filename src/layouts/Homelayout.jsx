import { useEffect } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {

    const authState = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onLogout() {
        dispatch(logout());
        navigate("/login");
    }

    useEffect(() => {
        if(!authState.isLoggedIn) navigate("/login");
    }, []);

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <BsFillMenuButtonWideFill 
                            size={'32px'}
                            className='cursor-pointer'
                        />
                    </label>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li><Link to="/">Home</Link></li>

                        <li><Link to="/dashboard">Dashboard</Link></li>

                        {authState.isLoggedIn && <li><Link to="/ticket/create">Create Ticket</Link></li>}

                        {authState.role === "admin" && <li><Link to="/users">All Users</Link></li>}

                        <li className='absolute bottom-8 w-3/4'>
                            <div className='w-full flex justify-center items-center'>
                                {
                                    !authState.isLoggedIn ? (
                                        <>  

                                            <Link to="/login" className='btn-primary text-center px-2 py-1 rounded-md font-semibold w-full'>Login</Link>
                                            <Link to="/signup" className='btn-secondary text-center px-2 py-1 rounded-md font-semibold w-full'>Signup</Link>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={onLogout} className='btn-primary px-2 py-1 rounded-md font-semibold w-full'>Logout</button>
                                            <Link className='btn-secondary px-2 py-1 rounded-md font-semibold w-full text-center'>Profile</Link>
                                        </>
                                    )
                                }

                                
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="flex items-start justify-center">
               <div className="w-3/4">
                    {children}
               </div>
            </div>

        </div>
    );
}

export default HomeLayout;