import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues} from "./apiAdmin";
import DataTable from 'react-data-table-component';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };
   

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data["products"],null,10)}</pre>;


  

    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Trainsaction',
            selector: row => row.transaction_id,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'Buyer',
            selector: row => row.user.name,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.createdAt,
            sortable: true,
        },
             
    ];

    return (
        <Layout>
         <DataTable columns={columns} data={orders} expandableRows expandableRowsComponent={ExpandedComponent} />
        </Layout>
    );
};

export default ManageOrders;