
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/Homelayout";

function Dashboard() {

    const [ticketState] = useTickets();

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">

                <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    Tickets Records
                </div>

                {/* Table */}

                <div className="flex flex-col w-full">

                    {/* Title row */}
                    <div className="flex text-white font-bold justify-between items-center gap-3 bg-purple-600 px-2 py-2 grid-cols-7">
                        <div className="table-title basis-[8%] justify-start">
                            Ticket Id
                        </div>
                        <div className="table-title basis-[12%]">
                            Title
                        </div>
                        <div className="table-title basis-[20%]">
                            Description
                        </div>
                        <div className="table-title basis-[20%]">
                            Reporter
                        </div>
                        <div className="table-title basis-[5%]">
                            Priority
                        </div>
                        <div className="table-title basis-[22%]">
                            Assignee
                        </div>
                        <div className="table-title basis-[13%] justify-end mr-4">
                            Status
                        </div>
                    </div>

                    {/* ticket details */}
                    {ticketState && ticketState.ticketList.map(ticket => {
                        return (
                            <div key={ticket._id} className="my-4 py-2 font-normal text-sm flex justify-between items-center gap-3 bg-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300 text-black px-2 py-2 grid-cols-7">
                                <div className="table-title basis-[8%] justify-start">
                                    {ticket._id.substring(0, 5)+".."}
                                </div>
                                <div className="table-title basis-[12%]">
                                    {ticket.title}
                                </div>
                                <div className="table-title basis-[20%]">
                                    {ticket.description}
                                </div>
                                <div className="table-title basis-[20%]">
                                    {ticket.assignee}
                                </div>
                                <div className="table-title basis-[5%]">
                                    {ticket.ticketPriority}
                                </div>
                                <div className="table-title basis-[22%]">
                                    {ticket.assignedTo}
                                </div>
                                <div className="table-title basis-[13%] justify-end mr-4">
                                    {ticket.status}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>  
        </HomeLayout>
    );
}

export default Dashboard;