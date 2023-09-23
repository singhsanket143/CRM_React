function TicketDetailsModal({ticket}) {
    
    return (
        <dialog id="ticket_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{ticket.title}</h3>
                {/* <p className="py-4">{ticket.description}</p> */}
                <textarea 
                    className="bg-white text-black my-2 rounded-lg resize-none p-2 w-full"
                    name="description" 
                    cols="50" 
                    rows="7"
                    value={ticket.description}
                >

                </textarea>
                
                <h1 className="text-lg text-white">
                    Priority: 
                    <select className="p-1 mx-2 bg-white text-black">
                        <option value="1" selected={ticket.ticketPriority == 1}>1</option>
                        <option value="2" selected={ticket.ticketPriority == 2}>2</option>
                        <option value="3" selected={ticket.ticketPriority == 3}>3</option>
                        <option value="4" selected={ticket.ticketPriority >= 4}>4</option>

                    </select>
                </h1>

                <h1 className="text-lg text-white my-4">
                    Status: 
                    <select className="p-1 mx-2 bg-white text-black">
                        <option value="open" selected={ticket.status == "open"}>open</option>
                        <option value="inProgress" selected={ticket.status == "inProgress"}>inProgress</option>
                        <option value="resolved" selected={ticket.status == "resolved"}>resolved</option>
                        <option value="onHold" selected={ticket.status == "onHold"}>onHold</option>
                        <option value="cancelled" selected={ticket.status == "cancelled"}>cancelled</option>

                    </select>
                </h1>

                <div className="modal-action">

                    <button 
                        className="btn-success px-4 py-2 rounded-md hover:bg-green-400 transition-all ease-in-out duration-300 font-semibold text-lg"
                    >
                        Update ticket
                    </button>
                
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                    <button>close</button>
            </form>
        </dialog>
    );

}

export default TicketDetailsModal;