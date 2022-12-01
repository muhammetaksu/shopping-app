import React, { useContext, useEffect, useLayoutEffect, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteRequest, getSingleRequestByUserId } from "../../../../../../../tools/Requests";
import LoadingText from "../../../../../../../assets/LoadingText";
import { loadingContext } from "../../../../../../../context/LoadingProvider";

const AddressList = ({ currentUser }) => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    const { isPending, setIsPending } = useContext(loadingContext);

    useLayoutEffect(() => {
        setIsPending(true);
        let getData = async () => {
            let result = await getSingleRequestByUserId(
                "address",
                currentUser._id,
                currentUser.token
            );

            setAddresses(result.data);
            setIsPending(false);
        };
        getData();
    }, [currentUser]);

    const confirm = (e) => {
        Modal.confirm({
            title: "Delete",
            icon: <DeleteOutlined />,
            content: "Are you sure to delete this adress?",
            okText: "Delete",
            cancelText: "Cancel",
            onOk() {
                deleteAddress(e);
            },
            onCancel() {},
        });
    };

    const deleteAddress = async (e) => {
        const result = await deleteRequest("address", e, currentUser.token);
        console.log(result);
        if (result?.status === 200) {
            setAddresses(addresses.filter((q) => q._id !== e));
            toast.success("Successfully deleted!");
        } else {
            console.log("deleteAddress()/Error");
        }
    };

    return (
        <>
            {isPending === true ? (
                <LoadingText />
            ) : (
                <div className="addressListCont">
                    {addresses?.length < 1 && (
                        <div>
                            <h3>There is no address!</h3>
                            <Link className="btn btn-primary" to={"../add"}>
                                Add Address
                            </Link>
                        </div>
                    )}
                    {addresses?.length > 0 && (
                        <table className="addressesCont">
                            <tr>
                                <th>Title</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {addresses &&
                                addresses.map((address, i) => (
                                    <tr key={i} className="addressListCont">
                                        <td>{address.title}</td>
                                        <td>
                                            {address.country +
                                                " " +
                                                address.state +
                                                " " +
                                                address.city +
                                                " " +
                                                address.district +
                                                " " +
                                                address.address}
                                            / Postal Code: {address.postalCode}
                                        </td>
                                        <td>
                                            <EditOutlined
                                                onClick={() => navigate(`../edit/${address._id}`)}
                                            />
                                            <DeleteOutlined onClick={() => confirm(address._id)} />
                                        </td>
                                    </tr>
                                ))}
                        </table>
                    )}
                </div>
            )}
        </>
    );
};

export default AddressList;
