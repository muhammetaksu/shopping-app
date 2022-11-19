import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API_URL } from "../../../../../env/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCurrentUser, setCurrentUser } from "../../../../../store/actions/mainActions";
import { userStorage } from "../../../../../service/localStorage/userStorage";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    surname: yup.string().required("Surname is required!"),
    email: yup.string().required("Email is required!").email("Invalid email format!"),
});

const ProfileDetail = ({ userId, userDetail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userDetail?.name,
            surname: userDetail?.surname,
            email: userDetail?.email,
        },
        validationSchema,
        onSubmit: (values) => {
            axios
                .put(API_URL + (userDetail.isAdmin ? "admins/" : "users/") + userId, values)
                .then((res) =>
                    res.status == 201
                        ? toast.success("Successfully updated! Please login again.")
                        : toast.error("There is an error!")
                )
                .then(() => {
                    userStorage.removeUser();
                    dispatch(clearCurrentUser());
                })
                .finally(() => navigate("/login"));
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
                    {!userDetail?.isAdmin && (
                        <>
                            <div className="form-item">
                                <p>
                                    Creation Date:{" "}
                                    {userDetail?.createdAt &&
                                        (userDetail?.createdAt).substring(0, 10)}{" "}
                                    /{" "}
                                    {userDetail?.createdAt &&
                                        (userDetail?.createdAt).substring(11, 16)}
                                </p>
                            </div>
                            <div className="form-item">
                                <p>
                                    {userDetail?.createdAt !== userDetail?.updatedAt && (
                                        <p>
                                            Last Edit Date:{" "}
                                            {userDetail.updatedAt &&
                                                (userDetail?.updatedAt).substring(0, 10)}{" "}
                                            /{" "}
                                            {userDetail.updatedAt &&
                                                (userDetail?.updatedAt).substring(11, 16)}
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
