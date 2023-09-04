import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Redux/Slices/AuthSlice";
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });

    function handleInputChange(e) {
        const {name, value} = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    }

    function resetLoginState() {
        setLoginDetails({
            email: "",
            password: ""
        });
    }

    async function onSubmit() {
        if(!loginDetails.email || !loginDetails.password) return;
        console.log("calling login", loginDetails);
        const response = await dispatch(login(loginDetails));
        if(response.payload) navigate("/");
        else resetLoginState();
    }

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Login</h2>
                    </div>
                    <div className="w-full">
                        <input 
                            onChange={handleInputChange}
                            name="email"
                            autoComplete="one-time-code" 
                            type="text" 
                            placeholder="email ..."
                            value={loginDetails.email}
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
                            value={loginDetails.password}
                            className="input text-white input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="w-full card-actions mt-4">
                        <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">Submit</button>
                    </div>
                    <p className="text-l text-white">
                        Donot have an account ? <Link className="text-yellow-200 font-semibold hover:text-white" to="/signup">Signup Instead</Link>
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default Login;