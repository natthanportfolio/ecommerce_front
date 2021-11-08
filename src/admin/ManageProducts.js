import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import DataTable from 'react-data-table-component';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);
    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Sold',
            selector: row => row.sold,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => 
            <Link to={`/admin/product/update/${row._id}`}>
            <button className="btn btn-warning">
                Edit
            </button>
        </Link>,
            sortable: true,
        },
        {
            name: 'Delete',
            selector: row => 
            <button 
                                    onClick={() => destroy(row._id)}
                                    className = "btn btn-danger"
                                >
                                    Delete
                                </button>,
            sortable: true,
        },
    ];
    return (
        <Layout >
            <DataTable
            columns={columns}
            data={products}
        />
        </Layout>
    );
};

export default ManageProducts;