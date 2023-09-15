import { ArcElement, CategoryScale,Chart as ChartJS, Legend,LinearScale,LineElement,PointElement,Title,Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line,Pie } from 'react-chartjs-2';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdCancel,MdOutlineDoneAll, MdPending } from 'react-icons/md';
import { TbProgressBolt } from 'react-icons/tb';

import Card from '../../components/Card';
import useTickets from '../../hooks/useTickets';
import HomeLayout from '../../layouts/Homelayout';

ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale,LinearScale,PointElement,LineElement);

function Home() {

    const [ticketsState] = useTickets();
    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [],
        inProgressTickets: [],
        resolvedTickets: [],
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
                if(ticket.status == "resolved") {
                    console.log(ticket);
                }
            });
            //  update the state
            console.log(resolvedTicketsData);
            setTicketsChartData({
                openTickets: openTicketsData,
                inProgressTickets: inProgressTicketsData,
                resolvedTickets: resolvedTicketsData
            });
        }
    }

    useEffect(() => {
        console.log(ticketsState);
        processTickets();
    }, [ticketsState.ticketList]);

    return (
        <HomeLayout>
            {ticketsState && (
                <div className='mt-10 flex flex-row justify-center items-center gap-5 flex-wrap'>
                <Card 
                    titleText='Open' 
                    status={ticketsState.ticketDistribution.open / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.open}
                    background='bg-yellow-300' 
                    borderColor='border-green-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <BsFillPencilFill className='inline mr-2' />
                </Card>
                <Card 
                    titleText='In Progress' 
                    status={ticketsState.ticketDistribution.inProgress / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.inProgress}
                    background='bg-orange-300' 
                    borderColor='border-red-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <TbProgressBolt className='inline mr-2' />
                </Card>
                <Card 
                    titleText='Resolved' 
                    status={ticketsState.ticketDistribution.resolved / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.resolved}
                    background='bg-purple-300' 
                    borderColor='border-blue-700' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdOutlineDoneAll className='inline mr-2' />
                </Card>
                <Card 
                    titleText='On Hold' 
                    status={ticketsState.ticketDistribution.onHold / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.onHold}
                    background='bg-gray-300' 
                    borderColor='border-gray-800' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdPending className='inline mr-2' />
                </Card>
                <Card 
                    titleText='Cancelled' 
                    status={ticketsState.ticketDistribution.cancelled / ticketsState.downloadedTickets.length} 
                    quantity={ticketsState.ticketDistribution.cancelled}
                    background='bg-blue-300' 
                    borderColor='border-violet-300' 
                    fontColor='text-black' 
                    dividerColor='bg-black'
                >
                    <MdCancel className='inline mr-2' />
                </Card>
                </div>
            )}
            <div className="mt-10 flex justify-center items-center gap-10">
                <div className="w-80 h-80 ">
                    <Pie data={pieChartData}/>
                </div>
                
            </div>
            <div className="mt-10 mb-10 flex justify-center items-center gap-10">

                <div className="w-[50rem] bg-[wheat]">
                    <Line data={lineChartData}/>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Home;