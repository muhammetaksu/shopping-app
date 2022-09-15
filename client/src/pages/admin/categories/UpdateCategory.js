import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../env/config";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object({
    name: yup.string().required("Brand is required!"),
});

function UpdateCategory() {
    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_URL}/categories/${id}`);
            if (response?.status == 200) {
                setCategory(response?.data);
            } else {
                alert("Something went wrong!");
            }
        };
        fetchData();
    }, [id]);

    console.log(category);
    return (
        <div className="my-2 m-3">
            <div>
                <h4 className="text-center border rounded p-1">Update Product</h4>
            </div>
            <div className="border p-3 rounded">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: category?.name || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (values) {
                            const response = await axios.put(`${API_URL}/categories/${id}`, values);
                            if (response?.status === 201) {
                                navigate("/admin/category-list");
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
                                    Category Name
                                </label>

                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    defaultValue={category.name}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter category name"
                                />
                                <div className="text-danger">
                                    {errors.name && touched.name && errors.name}
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                >
                                    Update Category
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default UpdateCategory;
