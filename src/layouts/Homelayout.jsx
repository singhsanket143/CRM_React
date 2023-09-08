import { BsFillMenuButtonWideFill } from "react-icons/bs";

function HomeLayout({ children }) {
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
                        <li><a>View All Tickets</a></li>
                        <li><a>Dashboard</a></li>

                        <li className='absolute bottom-8 w-3/4'>
                            <div className='w-full flex justify-center items-center'>
                                <button className='btn-primary px-2 py-1 rounded-md font-semibold w-full'>Login</button>
                                <button className='btn-secondary px-2 py-1 rounded-md font-semibold w-full'>Signup</button>
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