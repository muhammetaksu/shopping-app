import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../../tools/Requests";
import { toast } from "react-toastify";

const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
});

function AddCategory({ currentUser }) {
    const navigate = useNavigate();

    return (
        <div className="my-2 m-3">
            <div>
                <h5 className="m-0  p-3">Add Category</h5>
            </div>
            <div className="border p-3 rounded">
                <Formik
                    initialValues={{
                        name: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (values) {
                            const response = await postRequest(
                                "categories",
                                values,
                                currentUser.token
                            );
                            if (response?.status === 201) {
                                toast.success("Added successfully!");
                                navigate("/admin/category-list");
                            } else {
                                toast.error("Something went wrong");
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
                            <div className="col-lg-6">
                                <label htmlFor="name" className="form-label">
                                    Category Name
                                </label>

                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
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
                                    Add Category
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddCategory;
