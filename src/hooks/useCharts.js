import { ArcElement, BarElement,CategoryScale,Chart as ChartJS, Legend,LinearScale,LineElement,PointElement,Title,Tooltip,  } from "chart.js";
import { useEffect, useState } from "react";

import useTickets from "./useTickets";
ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale,LinearScale,PointElement,LineElement, BarElement,);

function useCharts() {
    const [ticketsState] = useTickets();
    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [],
        inProgressTickets: [],
        resolvedTickets: [],
        openTicketsByMonth: [],
        resolvedTicketsByMonth: [],
        inProgressTicketsByMonth: []
    });

    const pieChartData = {
        labels: Object.keys(ticketsState.ticketDistribution),
        fontColor: "white",
        datasets: [
            {
                label: "Tickets data",
                data: Object.values(ticketsState.ticketDistribution),
                backgroundColor: ["yellow", "red", "green", "blue", "purple", ],
                borderColor: ["yellow", "red", "green", "blue", "purple",],
                borderWidth: 1,
            }
        ]
    };


    const lineChartData = {
        labels: Object.keys(ticketsChartData.openTickets),
        fontColor: "white",
        datasets: [
            {
                label: "Open Tickets data",
                data: Object.values(ticketsChartData.openTickets),
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: "In Progress Tickets data",
                data: Object.values(ticketsChartData.inProgressTickets),
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: "Resolved Tickets data",
                data: Object.values(ticketsChartData.resolvedTickets),
                borderColor: 'rgb(245, 205, 95)',
                borderWidth: 4
            }
        ]
    };

    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Open',
            data: Object.values(ticketsChartData.openTicketsByMonth),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'In Progress',
            data: Object.values(ticketsChartData.inProgressTicketsByMonth),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Resolved',
            data:Object.values(ticketsChartData.resolvedTicketsByMonth),
            backgroundColor: 'rgba(53, 100, 235, 0.5)',
          },
        ],
      };


    function processTickets() {
        // Fetch the current Date
        const currentDate = new Date(); 
        // Calculate the 10th date from today
        const tenthDayFromToday = new Date(); 
        tenthDayFromToday.setDate(currentDate.getDate() - 10); 

        // Process all the tickets
        if(ticketsState.ticketList.length > 0 ) {
            // Prepare two localobjects to act as frequency map
            let openTicketsData = {};
            let inProgressTicketsData = {};
            let resolvedTicketsData = {};

            let openTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
            let inProgressTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
            let resolvedTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};

            // Initialise the frequency map with default value 0 for the last 10 days
            for(let i = 0; i < 10; i++) {
                // Get the ith day from today
                const dateObject = new Date();
                dateObject.setDate(currentDate.getDate() - i);
                /**
                 * dateObject.toLocaleDateString() -> gives us string in the format DD/MM/YYYY
                 * Convert this to YYYY-MM-DD
                 */
                openTicketsData[dateObject.toLocaleDateString().split("/").reverse().join("-")] = 0;
                inProgressTicketsData[dateObject.toLocaleDateString().split("/").reverse().join("-")] = 0;
                resolvedTicketsData[dateObject.toLocaleDateString().split("/").reverse().join("-")] = 0;
            }

            // Process all the tickets one by one
            ticketsState.ticketList.forEach(ticket => {
                // Get the date part from the tickets by removing everything post the character T
                const date = ticket.createdAt.split("T")[0];
                const ticketDate = new Date(ticket.createdAt);
                // If ticket is open and lies in the last 10 days add it
                if(ticket.status == "open" && ticketDate >= tenthDayFromToday) {
                    openTicketsData[date] =  openTicketsData[date] + 1;
                }

                // If ticket is inProgress and lies in the last 10 days add it
                if(ticket.status == "inProgress" && ticketDate >= tenthDayFromToday) {
                    inProgressTicketsData[date] = inProgressTicketsData[date] + 1;
                }

                // If ticket is resolved and lies in the last 10 days add it
                if(ticket.status == "resolved" && ticketDate >= tenthDayFromToday) {
                    resolvedTicketsData[date] = resolvedTicketsData[date] + 1;
                }
                
                // month wise data
                let month = ticketDate.toLocaleString('default', { month: 'long' });
                if(ticket.status == "open") {

                    openTicketsByMonth[month] += 1;
                }
                if(ticket.status == "resolved") {

                    resolvedTicketsByMonth[month] += 1;
                }
                if(ticket.status == "inProgress") {

                    inProgressTicketsByMonth[month] += 1;
                }
            });
            //  update the state
            console.log(resolvedTicketsData);
            setTicketsChartData({
                openTickets: openTicketsData,
                inProgressTickets: inProgressTicketsData,
                resolvedTickets: resolvedTicketsData,
                openTicketsByMonth: openTicketsByMonth,
                resolvedTicketsByMonth: resolvedTicketsByMonth,
                inProgressTicketsByMonth: inProgressTicketsByMonth
            });
        }
    }

    useEffect(() => {
        processTickets();
    }, [ticketsState.ticketList]);

    return [pieChartData, lineChartData, barChartData];

}

export default useCharts;