import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { API_URL } from "../../../env/config";
import { useNavigate } from "react-router-dom";

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

function AddSupplier() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    // const [selectedStates, setSelectedStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get(
                "https://countriesnow.space/api/v0.1/countries/states"
            );
            if (response?.status === 200) {
                setCountries(response.data.data);
            } else {
                alert("fetchCountries()error");
            }
        };
        fetchCountries();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            contactName: "",
            contactTitle: "",
            address1: "",
            postalCode: "",
            district: "",
            city: "",
            state: "",
            country: "",
            phone: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if (values) {
                const response = await axios.post(`${API_URL}/suppliers`, values);
                if (response?.status === 200) {
                    formik.resetForm();
                    navigate("/admin/supplier-list");
                } else {
                    alert("Something went wrong");
                    console.log(response);
                }
            }
        },
    });

    useEffect(() => {
        setSelectedCountry(formik.values.country);
    }, [formik.values.country]);

    console.log(formik.values);

    useEffect(() => {
        const findStates = async () => {
            const findStates = await countries.find((q) => q.name == selectedCountry);
            setStates(findStates?.states);
        };
        findStates();
    }, [selectedCountry]);

    return (
        <div className="my-2 m-3">
            <div>
                <h5 className="m-0  p-3">Add Supplier</h5>
            </div>
            <div className="border p-3 rounded">
                <form onSubmit={formik.handleSubmit} className=" row">
                    <div className="col-lg-3">
                        <label htmlFor="name" className="form-label">
                            Supplier Name
                        </label>

                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter supplier name"
                        />
                        <div className="text-danger">
                            {formik.errors.name && formik.touched.name && formik.errors.name}
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
                            value={formik.values.contactName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter contact name"
                        />
                        <div className="text-danger">
                            {formik.errors.contactName &&
                                formik.touched.contactName &&
                                formik.errors.contactName}
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
                            value={formik.values.contactTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter contact title (CEO, Manager etc.)"
                        />
                        <div className="text-danger">
                            {formik.errors.contactTitle &&
                                formik.touched.contactTitle &&
                                formik.errors.contactTitle}
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
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter contact title (CEO, Manager etc.)"
                        />
                        <div className="text-danger">
                            {formik.errors.phone && formik.touched.phone && formik.errors.phone}
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
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Select country"
                        >
                            <option value="">Select Country</option>

                            {countries &&
                                countries.map((cou, i) => (
                                    <option key={i} value={cou.name}>
                                        {cou.name}
                                    </option>
                                ))}
                        </select>
                        <div className="text-danger">
                            {formik.errors.country &&
                                formik.touched.country &&
                                formik.errors.country}
                        </div>
                    </div>
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="state" className="form-label">
                            State
                        </label>

                        <select
                            className="form-select"
                            id="state"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Select state"
                        >
                            <option value="">Select State</option>

                            {states &&
                                states.map((state, i) => (
                                    <option key={i} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                        </select>

                        <div className="text-danger">
                            {formik.errors.state && formik.touched.state && formik.errors.state}
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
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter City"
                        />

                        <div className="text-danger">
                            {formik.errors.city && formik.touched.city && formik.errors.city}
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
                            value={formik.values.district}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter postal code"
                        />
                        <div className="text-danger">
                            {formik.errors.district &&
                                formik.touched.district &&
                                formik.errors.district}
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
                            value={formik.values.address1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter address (neighborhood, avenue, street, house number, apartment number etc.)"
                        />
                        <div className="text-danger">
                            {formik.errors.address1 &&
                                formik.touched.address1 &&
                                formik.errors.address1}
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
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter postal code"
                        />
                        <div className="text-danger">
                            {formik.errors.postalCode &&
                                formik.touched.postalCode &&
                                formik.errors.postalCode}
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="btn btn-primary"
                        >
                            Add Supplier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSupplier;
