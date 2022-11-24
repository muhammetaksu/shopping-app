import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { countries } from "../../../../../../../assets/CountryList";
import { getSingleRequest, updateRequest } from "../../../../../../../tools/Requests";

const validationSchema = yup.object({
    title: yup.string().required("Title is required!"),
    country: yup.string().required("Country is required!"),
    state: yup.string(),
    city: yup.string().required("City is required!"),
    district: yup.string().required("District is required!"),
    address: yup.string().required("Address is required!"),
    postalCode: yup.string().required("Postal code is required!"),
});

const EditAddress = ({ currentUser }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [address, setAddress] = useState({});

    useEffect(() => {
        const getAddress = async () => {
            const response = await getSingleRequest("address", id, currentUser.token);
            setAddress(response.data);
        };
        getAddress();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: address.title || "",
            country: address.country || "",
            state: address.state || "",
            city: address.city || "",
            district: address.district || "",
            address: address.address || "",
            postalCode: address.postalCode || "",
            userId: currentUser._id,
        },
        validationSchema,
        onSubmit: async (values) => {
            let response = await updateRequest("address", id, currentUser.token, values);

            if (response.status === 200) {
                toast.success("Update successfully!");
                navigate("../list");
            } else {
                toast.error("There is an error!");
            }
        },
    });

    return (
        <div>
            <div className="border-bottom">
                <h5>Update Address</h5>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="form-item col-lg-6">
                        <label className="form-label" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            placeholder="Home, work etc."
                            className="form-control"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="form-item col-lg-6">
                        <label className="form-label" htmlFor="country">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                            placeholder="Enter country"
                            className="form-control"
                        >
                            <option value="">Please select</option>
                            {countries.map((country, i) => (
                                <option key={i} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.country && formik.errors.country && (
                            <p className="text-danger">{formik.errors.country}</p>
                        )}
                    </div>
                    <div className="form-item col-lg-6">
                        <label className="form-label" htmlFor="state">
                            State (if any)
                        </label>
                        <input
                            id="state"
                            name="state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.state}
                            placeholder="Enter state"
                            className="form-control"
                        />
                        {formik.touched.state && formik.errors.state && (
                            <p className="text-danger">{formik.errors.state}</p>
                        )}
                    </div>
                    <div className="form-item col-lg-6">
                        <label className="form-label" htmlFor="city">
                            City
                        </label>
                        <input
                            id="city"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                            placeholder="Enter city"
                            className="form-control"
                        />
                        {formik.touched.city && formik.errors.city && (
                            <p className="text-danger">{formik.errors.city}</p>
                        )}
                    </div>
                    <div className="form-item col-lg-6">
                        <label className="form-label" htmlFor="district">
                            District
                        </label>
                        <input
                            id="district"
                            name="district"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.district}
                            placeholder="Enter district"
                            className="form-control"
                        />
                        {formik.touched.district && formik.errors.district && (
                            <p className="text-danger">{formik.errors.district}</p>
                        )}
                    </div>
                    <div className="form-item col-lg-6">
                        <label className="form-label" htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input
                            id="postalCode"
                            name="postalCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.postalCode}
                            placeholder="Enter postal code"
                            className="form-control"
                        />
                        {formik.touched.postalCode && formik.errors.postalCode && (
                            <p className="text-danger">{formik.errors.postalCode}</p>
                        )}
                    </div>
                    <div className="form-item col-lg-12">
                        <label className="form-label" htmlFor="address">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            placeholder="Neighborhood, road, street, apartment number etc."
                            className="form-control"
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="text-danger">{formik.errors.address}</p>
                        )}
                    </div>
                </div>
                <div className="profileAddressBtn">
                    <button className="btn btn-primary">Update Address</button>
                </div>
            </form>
        </div>
    );
};

export default EditAddress;
