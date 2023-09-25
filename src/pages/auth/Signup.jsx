import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../Redux/Slices/AuthSlice";
function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupDetails, setSignUpDetails] = useState({
        email: "",
        password: "",
        name: "",
        userType: "",
        userStatus: "",
        clientName: ""
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setSignUpDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function handleUserType(e) {
        const userTypeSelected = e.target.textContent;
        setSignUpDetails({
            ...signupDetails, 
            userType: userTypeSelected,
            userStatus: (userTypeSelected === "customer") ? "approved" : "suspended"
        });
        const dropDown = document.getElementById("userTypeDropDown");
        dropDown.open = !dropDown.open;
    }

    function resetSignupState() {
        setSignUpDetails({
            email: "",
            password: "",
            name: "",
            userType: "",
            userStatus: "",
            clientName: ""
        });
    }

    async function onSubmit() {
        if(!signupDetails.email || 
            !signupDetails.password || 
            !signupDetails.userStatus || 
            !signupDetails.userType || 
            !signupDetails.name || 
            !signupDetails.clientName) return;
        const response = await dispatch(signup(signupDetails));
        if(response.payload) {
            // toast.success("Successfully signed up");
            navigate("/login");
        }
        else {
            // toast.error("Something went wrong, please try again !");
            resetSignupState();
        } 
        
    }

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Signup</h2>
                    </div>
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="email"
                            autoComplete="one-time-code" 
                            type="text" 
                            placeholder="email ..."
                            value={signupDetails.email}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="password"
                            autoComplete="one-time-code"  
                            type="password" 
                            placeholder="password" 
                            value={signupDetails.password}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="name"
                            autoComplete="one-time-code"  
                            type="text" 
                            placeholder="name" 
                            value={signupDetails.name}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <details className="dropdown mb-4 w-full" id="userTypeDropDown">
                        <summary className="btn">{(!signupDetails.userType) ? "User Type" : signupDetails.userType}</summary>
                        <ul onClick={handleUserType} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52">
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                            <li><a>admin</a></li>
                        </ul>
                    </details>
                    
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="clientName"
                            autoComplete="one-time-code"  
                            type="text" 
                            placeholder="client name" 
                            value={signupDetails.clientName}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    
                    <div className="w-full card-actions mt-4">
                    <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">Submit</button>
                    </div>

                    <p className="text-l text-white">
                        Already have an account ? <Link className="text-yellow-200 font-semibold hover:text-white" to="/login">Login Instead</Link>
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default Signup;