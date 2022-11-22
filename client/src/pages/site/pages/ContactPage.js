import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { postRequest } from "../../../tools/Requests";

const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    surname: yup.string().required("Surname is required!"),
    email: yup.string().email().required("Email is required!"),
    title: yup.string().required("Title is required!"),
    message: yup.string().required("Message is required!"),
});

const ContactPage = () => {
    const { currentUser } = useSelector((state) => state.userReducer);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: currentUser?.name || "",
            surname: currentUser?.surname || "",
            email: currentUser?.email || "",
            title: "",
            message: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setIsSubmitting(true);
            postRequest("contact", values)
                .then((res) =>
                    res.status === 201
                        ? toast.success("Your message has been sent!")
                        : toast.error("There is an error!")
                )
                .finally(() => {
                    setIsSubmitting(false);
                    navigate("/");
                });
        },
    });
    return (
        <div className="container ">
            <div className="mt-4 mx-auto text-center col-lg-6 m-0 py-2 px-4 bg-light border rounded">
                <h2 className="m-0">Contact us</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-lg-6 row p-0">
                        <div className="form-item col-lg-6">
                            <label className="form-label" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Enter your name"
                                className="form-control"
                                readOnly={currentUser.token ? true : false}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-danger">{formik.errors.name}</p>
                            )}
                        </div>
                        <div className="form-item col-lg-6">
                            <label className="form-label" htmlFor="surname">
                                Surname
                            </label>
                            <input
                                id="surname"
                                name="surname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.surname}
                                placeholder="Enter your surname"
                                className="form-control"
                                readOnly={currentUser.token ? true : false}
                            />
                            {formik.touched.surname && formik.errors.surname && (
                                <p className="text-danger">{formik.errors.surname}</p>
                            )}
                        </div>
                        <div className="form-item col-lg-6">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="Enter your email"
                                className="form-control"
                                readOnly={currentUser.token ? true : false}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-danger">{formik.errors.email}</p>
                            )}
                        </div>
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
                                placeholder="Enter your title"
                                className="form-control"
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p className="text-danger">{formik.errors.title}</p>
                            )}
                        </div>
                        <div className="form-item col-lg-12">
                            <label className="form-label" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                                placeholder="Enter your message"
                                className="form-control"
                            />
                            {formik.touched.message && formik.errors.message && (
                                <p className="text-danger">{formik.errors.message}</p>
                            )}
                        </div>
                        <div className="form-item col-lg-12 d-flex justify-content-end">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
