import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../env/config";
import { toast } from "react-toastify";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const sendMail = async (e) => {
        e.preventDefault();
        try {
            const response = new Promise((resolve, reject) => {
                return resolve(axios.post(`${API_URL}/reset-password`, { email: email }));
            });
            setEmail("");
            console.log(response);
            await toast.promise(response, {
                pending: {
                    render() {
                        return "Mail sending...";
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
    };

    return (
        <div className="resetPassPageCont container row d-flex justify-content-center m-auto py-3">
            <div
                id="resetPassCont"
                className="col-lg-6 p-5 d-flex flex-column rounded-start border-start border-top border-bottom bg-light justify-content-center"
            >
                <div className="d-flex flex-column justify-content-center">
                    <div className="mb-4 d-flex justify-content-center">
                        <h3 className="text-center">Forgot Password</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form
                            onSubmit={sendMail}
                            id="loginForm"
                            className="d-flex flex-column gap-4"
                        >
                            <div className="d-flex gap-2 flex-column">
                                <label htmlFor="email" className="m-0 form-label ">
                                    <span className="">Email</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    className="form-control auth-form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary" type="submit">
                                    Send Mail
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="forgotCont" className="row d-flex justify-content-center gap-2 mt-4">
                        <div
                            style={{ cursor: "pointer" }}
                            className="text-center col-lg-6 p-0 fw-bold"
                        >
                            <Link to={"/register"}>Register</Link>
                        </div>
                        <div style={{ cursor: "pointer" }} className="text-center col-lg-6 fw-bold">
                            <Link to={"/login"}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="imgCont" className="col-lg-6 rounded-end border-end border-top border-bottom">
                <div>
                    <img
                        id="resetPassImg"
                        src="https://live.staticflickr.com/65535/52367925557_216d1d1ce7_b.jpg"
                        alt="reset-pass"
                    />
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
