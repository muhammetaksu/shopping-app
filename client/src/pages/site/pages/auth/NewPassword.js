import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../../env/config";
import { toast } from "react-toastify";

function NewPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [data, setData] = useState("");
    const { id, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length >= 8 && confirmPassword.length >= 8) {
            if (password === confirmPassword) {
                try {
                    const response = new Promise((resolve, reject) => {
                        return resolve(
                            axios.post(`${API_URL}reset-password/${id}/${token}`, {
                                password: password,
                            })
                        );
                    });

                    setPassword("");
                    setConfirmPassword("");

                    await toast.promise(response, {
                        pending: {
                            render() {
                                return "Password is changing...";
                            },
                        },
                        success: {
                            render({ data }) {
                                return `${data.data.message}`;
                            },
                        },
                        error: {
                            render({ data }) {
                                return `${data.response.data.message}`;
                            },
                        },
                    });

                    navigate("/login");
                } catch (error) {
                    toast.error(error);
                }
            } else {
                toast.warning("Passwords don't match!");
            }
        } else {
            toast.warning("Password must be at least 8 characters!");
        }
    };

    return (
        <div className="newPassPageCont py-3 container row d-flex justify-content-center m-auto">
            <div
                id="newPassCont"
                className="col-lg-6 p-5 d-flex flex-column rounded-start border-start border-top border-bottom bg-light justify-content-center"
            >
                <div className="d-flex flex-column justify-content-center">
                    <div className="mb-4 d-flex justify-content-center">
                        <h3 className="text-center">New Password</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form
                            onSubmit={handleSubmit}
                            id="loginForm"
                            className="d-flex flex-column gap-4"
                        >
                            <div className="d-flex gap-2 flex-column">
                                <label htmlFor="password" className="m-0 form-label ">
                                    <span className="">New Password</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control auth-form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-flex gap-2 flex-column">
                                <label htmlFor="confirmPassword" className="m-0 form-label ">
                                    <span className="">Confirm New Password</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control auth-form-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div
                id="imgCont"
                className="col-lg-6  rounded-end border-end border-top border-bottom "
            >
                <div>
                    <img
                        id="resetPassImg"
                        src="https://live.staticflickr.com/65535/52378431761_72c3359112_o.jpg"
                        alt="new-pass"
                    />
                </div>
            </div>
        </div>
    );
}

export default NewPassword;
