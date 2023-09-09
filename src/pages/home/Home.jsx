import { useEffect } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/Card';
import HomeLayout from '../../layouts/Homelayout';
import { getAllTicketsforTheUser } from '../../Redux/Slices/TicketSlice';
function Home() {

    const authState = useSelector((state) => state.auth);
    const ticketsState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    async function loadTickets() {
        const response = await dispatch(getAllTicketsforTheUser());
        console.log(response);
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token]);

    return (
        <HomeLayout>
            <div className='flex flex-row justify-center items-center gap-5'>
            <Card>
                <BsFillPencilFill className='inline mr-2' />
            </Card>

            <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card>
            <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card>
            <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card>
            </div>
            
        </HomeLayout>
    );
}

export default Home;