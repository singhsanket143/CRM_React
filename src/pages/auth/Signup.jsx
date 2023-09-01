function Signup() {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Signup</h2>
                    </div>
                    <div className="w-full">
                        <input autoComplete="one-time-code"  type="text" placeholder="user id ..." className="input text-white input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="w-full">
                        <input autoComplete="one-time-code"  type="email" placeholder="email..." className="input text-white input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="w-full">
                        <input autoComplete="one-time-code"  type="password" placeholder="password" className="input text-white input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <details className="dropdown mb-4 w-full">
                        <summary className="btn">User Type</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52">
                            <li><a>Customer</a></li>
                            <li><a>Engineer</a></li>
                        </ul>
                    </details>
                    <div className="w-full card-actions mt-4">
                        <button className="btn btn-warning w-full font-bold text-xl">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Signup;