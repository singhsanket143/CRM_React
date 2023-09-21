import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({user, resetTable}) {
    
    const [userDisplay, setUserDisplay] = useState(user);

    async function handleStatusChange(e) {
        try {
            const dropdown = document.getElementById("userstatusDropdown");
            dropdown.open = !dropdown.open;
            toast("Updating the user....");
            const response = await axiosInstance.patch("user/updateUser", {
                userId: userDisplay.id, 
                updates: {
                    ...userDisplay,
                    userStatus: e.target.textContent
                } 
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });

            if(response?.data?.result) {
                toast.success("Successfully updated the user");
                const user = response?.data?.result;
                setUserDisplay({
                    name: user.name,
                    email: user.email,
                    userStatus: user.userStatus,
                    userType: user.userType,
                    clientName: user.clientName
                });
                resetTable();
            }

        } catch(error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <dialog id="user_details_modal" className="modal">
            <div className="modal-box text-lg font-semibold ">
                <h3 className="font-bold text-lg">User Details</h3>
                <p className="py-4">Name: <span className="text-yellow-500"> {userDisplay.name}</span></p>
                <p className="py-4">Client Name: <span className="text-yellow-500"> {userDisplay.clientName}</span></p>
                <p className="py-4">Status: 
                    <span className="text-yellow-500"> 
                        <details className="dropdown ml-2" id="userstatusDropdown">
                            <summary className="m-1 btn">{userDisplay.userStatus}</summary>
                            <ul onClick={handleStatusChange} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li><a>approved</a></li>
                                <li><a>suspended</a></li>
                                <li><a>rejected</a></li>
                            </ul>
                        </details>
                    </span>
                </p>
                <p className="py-4">Type: <span className="text-yellow-500"> {userDisplay.userType}</span></p>
                <p className="py-4">email: <span className="text-yellow-500"> {userDisplay.email}</span></p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserDetailsModal;