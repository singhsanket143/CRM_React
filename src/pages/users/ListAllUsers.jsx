import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import UserDetailsModal from "../../components/UserDetailsModal";
import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../layouts/Homelayout";

function ListAllUsers() {

    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            reorder: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            reorder: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            reorder: true,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            reorder: true,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            reorder: true,
            sortable: true,
        },
    ];

    const [userList, setUserList] = useState([]);

    const [userDisplay, setUserDisplay] = useState({
        name: '',
        email: '',
        userType: '',
        userStatus: '',
        clientName: '',
        id: ''
    });

    async function loadUsers() {
        const response = await axiosInstance.get("/users", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        console.log(response);
        setUserList(response?.data?.result);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center">
                <h1 className="text-center font-bold text-5xl mb-4 text-yellow-500">
                    Users List
                </h1>
                {userList && 
                    <DataTable
                        onRowClicked={(row) => {
                            setUserDisplay({
                                name: row.name,
                                clientName: row.clientName,
                                email: row.email,
                                userStatus: row.userStatus,
                                userType: row.userType,
                                id: row._id
                            });
                            document.getElementById('user_details_modal').showModal();
                        }}
                        columns={columns}
                        data={userList}
                    />
                }
                <UserDetailsModal key={userDisplay.email} user={userDisplay} resetTable={loadUsers}/>
            </div>
        </HomeLayout>
    );
}

export default ListAllUsers;