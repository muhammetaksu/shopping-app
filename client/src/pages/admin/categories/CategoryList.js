import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../store/middleware/thunkActions";
import axios from "axios";
import { API_URL } from "../../../env/config";

import "antd/dist/antd.css";
import { Modal, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

function CategoryList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    // const originalDataState = useSelector((state) => state.originalProductsReducer);
    // const { originalProducts } = originalDataState;

    // const suppliersState = useSelector((state) => state.suppliersReducer);
    // const { suppliers } = suppliersState;

    const categoriesState = useSelector((state) => state.categoriesReducer);
    const { categories } = categoriesState;

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: "Name",
            width: "90%",
            dataIndex: "name",
            defaultSortOrder: "descend",

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
                        className="text-info"
                        style={{ cursor: "pointer", fontSize: "20px" }}
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

    const deleteCategory = async (e) => {
        const controller = new AbortController();
        const { signal } = controller;
        const result = await axios.delete(`${API_URL}/categories/${e}`, {
            signal,
        });
        if (result?.status === 200) {
            dispatch(fetchCategories());
        } else {
            console.log("deleteCategory()/Error");
        }
        console.log(e);
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
