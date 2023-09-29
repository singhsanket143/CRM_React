import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets,getAllCreatedTicketsforTheUser,getAllTicketsforTheUser, resetTicketList } from "../Redux/Slices/TicketSlice";

function useTickets() {
    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const [searchParams] = useSearchParams();


    const dispatch = useDispatch();


    async function loadTickets() {
        if(ticketState.downloadedTickets.length == 0) {
            if(authState.role === "customer") {
                await dispatch(getAllCreatedTicketsforTheUser());
            } else {
                await dispatch(getAllTicketsforTheUser());
            }
        }
        if(searchParams.get("status")) {
            // dispatch a filter action
            console.log(searchParams.get("status"));
            dispatch(filterTickets({status: searchParams.get("status")}));
        } else {
            dispatch(resetTicketList());
        }
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token, searchParams.get("status")]);

    return [ticketState];
}

export default useTickets;