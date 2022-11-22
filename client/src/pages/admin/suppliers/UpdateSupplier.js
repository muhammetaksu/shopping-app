import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../env/config";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    contactName: yup.string().required("Contact name is required!"),
    contactTitle: yup.string().required("Contact title is required!"),
    address1: yup.string().required("Address is required!"),
    postalCode: yup.string().required("Postal code is required!"),
    district: yup.string(),
    city: yup.string().required("City is required!"),
    state: yup.string(),
    country: yup.string().required("Country is required!"),
    phone: yup.string().required("Phone is required!"),
});

function UpdateSupplier() {
    const [supplier, setSupplier] = useState("");
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_URL}suppliers/${id}`);
            if (response?.status === 200) {
                setSupplier(response?.data);
            } else {
                alert("Something went wrong!");
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            if (response?.status === 200) {
                response.data.sort(function (a, b) {
                    if (a.name.common < b.name.common) {
                        return -1;
                    }
                    if (a.name.common > b.name.common) {
                        return 1;
                    }
                    return 0;
                });

                setCountries(response.data);
            } else {
                alert("fetchCountries()error");
            }
        };
        fetchCountries();
    }, []);

    console.log(supplier);
    return (
        <div className="my-2 m-3">
            <div>
                <h4 className="text-center border rounded p-1">Update Supplier</h4>
            </div>
            <div className="border p-3 rounded">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: supplier?.name || "",
                        contactName: supplier?.contactName || "",
                        contactTitle: supplier?.contactTitle || "",
                        address1: supplier?.address?.address1 || "",
                        postalCode: supplier?.address?.postalCode || "",
                        district: supplier?.address?.district || "",
                        city: supplier?.address?.city || "",
                        state: supplier?.address?.state || "",
                        country: supplier?.address?.country || "",
                        phone: supplier?.address?.phone || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (values) {
                            const response = await axios.put(`${API_URL}suppliers/${id}`, values);
                            if (response?.status === 201) {
                                navigate("/admin/supplier-list");
                            } else {
                                alert("Something went wrong");
                                console.log(response);
                            }
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit} className=" row">
                            <div className="col-lg-3">
                                <label htmlFor="name" className="form-label">
                                    Supplier Name
                                </label>

                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter supplier name"
                                />
                                <div className="text-danger">
                                    {errors.name && touched.name && errors.name}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="contactName" className="form-label">
                                    Contact Name
                                </label>

                                <input
                                    className="form-control"
                                    id="contactName"
                                    name="contactName"
                                    value={values.contactName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter contact name"
                                />
                                <div className="text-danger">
                                    {errors.contactName &&
                                        touched.contactName &&
                                        errors.contactName}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="contactTitle" className="form-label">
                                    Contact Title
                                </label>

                                <input
                                    className="form-control"
                                    id="contactTitle"
                                    name="contactTitle"
                                    value={values.contactTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter contact title (CEO, Manager etc.)"
                                />
                                <div className="text-danger">
                                    {errors.contactTitle &&
                                        touched.contactTitle &&
                                        errors.contactTitle}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter contact title (CEO, Manager etc.)"
                                />
                                <div className="text-danger">
                                    {errors.phone && touched.phone && errors.phone}
                                </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                                <label htmlFor="country" className="form-label">
                                    Country
                                </label>

                                <select
                                    className="form-select"
                                    id="country"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Select country"
                                >
                                    <option value="">Select Country</option>

                                    {countries &&
                                        countries.map((country, i) => (
                                            <option key={i} value={country?.name.common}>
                                                {country?.name.common}
                                            </option>
                                        ))}
                                </select>
                                <div className="text-danger">
                                    {errors.country && touched.country && errors.country}
                                </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                                <label htmlFor="city" className="form-label">
                                    City
                                </label>

                                <input
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter city"
                                />
                                <div className="text-danger">
                                    {errors.city && touched.city && errors.city}
                                </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                                <label htmlFor="state" className="form-label">
                                    State
                                </label>

                                <input
                                    className="form-control"
                                    id="state"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter state"
                                />
                                <div className="text-danger">
                                    {errors.state && touched.state && errors.state}
                                </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                                <label htmlFor="district" className="form-label">
                                    District
                                </label>

                                <input
                                    className="form-control"
                                    id="district"
                                    name="district"
                                    value={values.district}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter postal code"
                                />
                                <div className="text-danger">
                                    {errors.district && touched.district && errors.district}
                                </div>
                            </div>
                            <div className="col-lg-9 mt-3">
                                <label htmlFor="address1" className="form-label">
                                    Address
                                </label>

                                <input
                                    className="form-control"
                                    id="address1"
                                    name="address1"
                                    value={values.address1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter address (neighborhood, avenue, street, house number, apartment number etc.)"
                                />
                                <div className="text-danger">
                                    {errors.address1 && touched.address1 && errors.address1}
                                </div>
                            </div>
                            <div className="col-lg-3 mt-3">
                                <label htmlFor="postalCode" className="form-label">
                                    Postal Code
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    id="postalCode"
                                    name="postalCode"
                                    value={values.postalCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter postal code"
                                />
                                <div className="text-danger">
                                    {errors.postalCode && touched.postalCode && errors.postalCode}
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                >
                                    Update Supplier
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default UpdateSupplier;
