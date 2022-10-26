import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchSuppliers } from "../../../store/middleware/thunkActions";
import axios from "axios";
import { API_URL } from "../../../env/config";

import "antd/dist/antd.min.css";
import { Modal, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

function SupplierList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSuppliers());
    }, []);

    // const originalDataState = useSelector((state) => state.originalProductsReducer);
    // const { originalProducts } = originalDataState;

    // const suppliersState = useSelector((state) => state.suppliersReducer);
    // const { suppliers } = suppliersState;

    const suppliersState = useSelector((state) => state.suppliersReducer);
    const { suppliers } = suppliersState;

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",

            sorter: (a, b) => {
                const nameA = a.name.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.name.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },
        {
            title: "Contact Name",
            dataIndex: "contactName",

            sorter: (a, b) => {
                const nameA = a.contactName.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.contactName.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },
        {
            title: "Contact Title",
            dataIndex: "contactTitle",

            sorter: (a, b) => {
                const nameA = a.contactTitle.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.contactTitle.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },
        {
            title: "City",
            dataIndex: "address",
            render: (address) => [address].map((ad) => ad.city).join(),

            sorter: (a, b) => {
                const nameA = a.address.city.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.address.city.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },
        {
            title: "Country",
            dataIndex: "address",
            render: (address) => [address].map((ad) => ad.country).join(),

            sorter: (a, b) => {
                const nameA = a.address.country.toLowerCase(); // ignore Lower and lowercase
                const nameB = b.address.country.toLowerCase(); // ignore Lower and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            },
        },

        {
            title: "Action",
            dataIndex: "_id",
            key: "x",
            align: "center",
            render: (e) => (
                <div className="d-flex justify-content-evenly">
                    <EditOutlined
                        onClick={() => navigate(`/admin/update-supplier/${e}`)}
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
            content: "Are you sure to delete this supplier?",
            okText: "Delete",
            cancelText: "Cancel",
            onOk() {
                deleteSupplier(e);
            },
            onCancel() {},
        });
    };

    const deleteSupplier = async (e) => {
        const controller = new AbortController();
        const { signal } = controller;
        const result = await axios.delete(`${API_URL}/suppliers/${e}`, {
            signal,
        });
        if (result?.status === 200) {
            dispatch(fetchSuppliers());
        } else {
            console.log("deleteSupplier()/Error");
        }
        console.log(e);
    };

    return (
        <>
            <Table
                title={() => <h5 className="m-0">Supplier List</h5>}
                bordered={true}
                columns={columns}
                dataSource={suppliers}
                onChange={onChange}
            />
        </>
    );
}

export default SupplierList;
