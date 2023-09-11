import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTicketsforTheUser } from "../Redux/Slices/TicketSlice";

function useTickets() {
    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();


    async function loadTickets() {
        await dispatch(getAllTicketsforTheUser());
    }

    useEffect(() => {
        if(ticketState.ticketList.length == 0) {
            loadTickets();
        }
    }, [authState.token]);

    return [ticketState];
}

export default useTickets;