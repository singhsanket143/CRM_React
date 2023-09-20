import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

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
            <div className="min-h-[90vh] flex items-center justify-center">
                {userList && 
                    <DataTable
                        columns={columns}
                        data={userList}
                    />
                }
            </div>
        </HomeLayout>
    );
}

export default ListAllUsers;