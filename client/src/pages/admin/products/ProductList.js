import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../../store/middleware/thunkActions";
import axios from "axios";
import { API_URL } from "../../../env/config";

import "antd/dist/antd.min.css";
import { Modal, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const originalDataState = useSelector((state) => state.originalProductsReducer);
    const { originalProducts } = originalDataState;

    // const suppliersState = useSelector((state) => state.suppliersReducer);
    // const { suppliers } = suppliersState;

    // const categoriesState = useSelector((state) => state.categoriesReducer);
    // const { categories } = categoriesState;

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: "Brand",
            dataIndex: "brand",
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
            ],
            sorter: (a, b) => {
                const nameA = a.brand.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.brand.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },
        {
            title: "Model",
            dataIndex: "model",
            sorter: (a, b) => {
                const nameA = a.model.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.model.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },
        {
            title: "Unit Price",
            dataIndex: "unitPrice",
            sorter: (a, b) => a.unitPrice - b.unitPrice,
        },
        {
            title: "Units in Stock",
            dataIndex: "unitsInStock",
            sorter: (a, b) => a.unitsInStock - b.unitsInStock,
        },
        {
            title: "Action",
            dataIndex: "_id",
            key: "x",
            align: "center",
            render: (e) => (
                <div className="d-flex justify-content-evenly">
                    <EditOutlined
                        onClick={() => navigate(`/admin/update-product/${e}`)}
                        style={{ cursor: "pointer", fontSize: "20px", color: "#161920" }}
                    />
                    <CloseOutlined
                        onClick={() => confirm(e)}
                        className="text-danger"
                        style={{ cursor: "pointer", fontSize: "20px" }}
                    />
                </div>
            ),
        },
    ];

    const confirm = (e) => {
        Modal.confirm({
            title: "Delete",
            icon: <DeleteOutlined />,
            content: "Are you sure to delete this product?",
            okText: "Delete",
            cancelText: "Cancel",
            onOk() {
                deleteProduct(e);
            },
            onCancel() {},
        });
    };

    const deleteProduct = async (e) => {
        const controller = new AbortController();
        const { signal } = controller;
        const result = await axios.delete(`${API_URL}/products/${e}`, {
            signal,
        });
        if (result?.status === 200) {
            dispatch(fetchProducts());
        } else {
            console.log("deleteProduct()/Error");
        }
        console.log(e);
    };

    return (
        <>
            <Table
                title={() => <h5 className="m-0">Product List</h5>}
                bordered={true}
                columns={columns}
                dataSource={originalProducts}
                onChange={onChange}
            />
        </>
    );
}

export default ProductList;
