import HomeLayout from "../../layouts/Homelayout";

function CreateTicket() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">

                <form 

                    className="min-w-[40rem] border p-20 border-sky-500 rounded-lg hover:bg-sky-900 transition-all ease-in-out duration-300"
                >

                    <h1 className="text-3xl font-semibold text-white text-center">
                        Create new ticket
                    </h1>

                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text text-white text-lg">What is title of the issue?</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full bg-white text-black" />
                    </div>

                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text text-white text-lg">Please describe your issue?</span>
                        </label>
                        <textarea 
                            placeholder="Type here"
                            rows="8"
                            className="p-2 resize-none w-full rounded-md bg-white text-black" 
                        ></textarea>
                        
                    </div>

                    <button className="w-full px-4 py-2 bg-green-500 text-lg font-semibold text-white rounded-md hover:bg-green-600 transition-all ease-in-out duration-300">
                        Submit
                    </button>

                </form>

            </div>
        </HomeLayout>
    );
}

export default CreateTicket;