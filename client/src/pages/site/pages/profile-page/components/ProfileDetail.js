import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../../../../store/actions/mainActions";
import { userStorage } from "../../../../../service/localStorage/userStorage";
import { useNavigate } from "react-router-dom";
import { updateRequest } from "../../../../../tools/Requests";

const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    surname: yup.string().required("Surname is required!"),
    email: yup.string().required("Email is required!").email("Invalid email format!"),
});

const ProfileDetail = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: currentUser?.name,
            surname: currentUser?.surname,
            email: currentUser?.email,
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await updateRequest(
                currentUser.isAdmin ? "admins" : "users",
                currentUser._id,
                currentUser.token,
                values
            );

            if (response.status === 200) {
                toast.success("Successfully updated! Please login again.");
                userStorage.removeUser();
                dispatch(clearCurrentUser());
                navigate("/login");
            } else {
                toast.error("There is an error!");
            }
        },
    });

    return (
        <div className="profileDetailCont">
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-item">
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
                        />
                    </div>
                    <div className="form-item">
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
                        />
                    </div>
                    <div className="form-item">
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
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger">{formik.errors.email}</p>
                        )}
                    </div>
                    {!currentUser?.isAdmin && (
                        <>
                            <div className="form-item">
                                <p>
                                    Creation Date:{" "}
                                    {currentUser?.createdAt &&
                                        (currentUser?.createdAt).substring(0, 10)}{" "}
                                    /{" "}
                                    {currentUser?.createdAt &&
                                        (currentUser?.createdAt).substring(11, 16)}
                                </p>
                            </div>
                            <div className="form-item">
                                <p>
                                    {currentUser?.createdAt !== currentUser?.updatedAt && (
                                        <p>
                                            Last Edit Date:{" "}
                                            {currentUser.updatedAt &&
                                                (currentUser?.updatedAt).substring(0, 10)}{" "}
                                            /{" "}
                                            {currentUser.updatedAt &&
                                                (currentUser?.updatedAt).substring(11, 16)}
                                        </p>
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                    <div className="profilePageBtn">
                        <button className="btn btn-primary" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileDetail;
