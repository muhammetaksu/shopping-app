import React, { useEffect, useState } from "react";
import { getRequest } from "../../../../../../../tools/Requests";

const AddressList = ({ currentUser }) => {
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        getRequest("address", currentUser.token).then((res) => setAddresses(res.data));
    }, []);
    console.log(addresses);
    return (
        <div className="addressListCont">
            <table className="addressesCont">
                <tr>
                    <th className="" colSpan="1">
                        Title
                    </th>
                    <th className="" colSpan="4">
                        Address
                    </th>
                    <th className="" colSpan="1">
                        Action
                    </th>
                </tr>
                {addresses &&
                    addresses.map((address) => (
                        <tr>
                            <td>{address.title}</td>
                            <td>{address.title}</td>
                            <td>{address.title}</td>
                            <td>{address.title}</td>
                            <td>{address.title}</td>
                            <td>{address.title}</td>
                        </tr>
                    ))}
            </table>
        </div>
    );
};

export default AddressList;
