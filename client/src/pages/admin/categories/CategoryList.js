import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../store/middleware/thunkActions";
import axios from "axios";
import { API_URL } from "../../../env/config";

import "antd/dist/antd.min.css";
import { Modal, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteRequest } from "../../../tools/Requests";
import { toast } from "react-toastify";

function CategoryList({ currentUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const categoriesState = useSelector((state) => state.categoriesReducer);
    const { categories } = categoriesState;

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: "Name",
            width: "88%",
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
            title: "Action",
            dataIndex: "_id",
            key: "x",
            align: "center",
            render: (e) => (
                <div className="d-flex justify-content-evenly">
                    <EditOutlined
                        onClick={() => navigate(`/admin/update-category/${e}`)}
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
            content: "Are you sure to delete this category?",
            okText: "Delete",
            cancelText: "Cancel",
            onOk() {
                deleteCategory(e);
            },
            onCancel() {},
        });
    };

    const deleteCategory = async (id) => {
        const result = await deleteRequest("categories", id, currentUser.token);
        if (result?.status === 200) {
            toast.success("Delete successfully!");
            dispatch(fetchCategories());
        } else {
            toast.error("There is an error!");
            console.log("deleteCategory()/Error");
        }
    };

    return (
        <>
            <Table
                title={() => <h5 className="m-0">Category List</h5>}
                bordered={true}
                columns={columns}
                dataSource={categories}
                onChange={onChange}
            />
        </>
    );
}

export default CategoryList;
