import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSuppliers } from "../../../store/middleware/thunkActions";

import "antd/dist/antd.min.css";
import { Modal, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteRequest } from "../../../tools/Requests";
import { toast } from "react-toastify";

function SupplierList({ currentUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        const result = await deleteRequest("suppliers", e, currentUser.token);
        if (result?.status === 200) {
            toast.success("Delete successfully!");
            dispatch(fetchSuppliers());
        } else {
            toast.error("There is an error!");
            console.log("deleteSupplier()/Error");
        }
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
