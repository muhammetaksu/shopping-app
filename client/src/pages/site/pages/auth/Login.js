import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../env/config";
import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { userStorage } from "../../../../service/localStorage/userStorage";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../../store/actions/mainActions";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = {
        email: email,
        password: password,
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (password && email === "") {
            alert("Email and Password cannot be blank!");
        } else {
            try {
                const response = new Promise((resolve, reject) => {
                    return resolve(axios.post(`${API_URL}/login`, user));
                });

                await toast.promise(response, {
                    pending: "Logging In...",
                    success: "Logged In!",
                    error: "Login Failed!",
                });

                response
                    .then((q) => {
                        const setStorageInfo = {
                            name: q.data.user.name,
                            surname: q.data.user.surname,
                            email: q.data.user.email,
                            token: q.data.token,
                        };
                        userStorage.setUser(setStorageInfo);
                        return q;
                    })
                    .then((q) => {
                        const userInfo = {
                            name: q.data.user.name,
                            surname: q.data.user.surname,
                            email: q.data.user.email,
                            token: q.data.token,
                        };
                        dispatch(setCurrentUser(userInfo));
                    })
                    .catch((err) => console.log(err))
                    .finally(() => navigate("/"));
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className="container row d-flex justify-content-center m-auto">
            <div
                id="imgCont"
                className="col-lg-6 d-flex justify-content-center rounded-start border-start border-top border-bottom p-0"
            >
                <div style={{ maxWidth: "50vw", maxHeight: "50vw" }}>
                    <img
                        id="loginImg"
                        className="h-100 w-100"
                        style={{ objectFit: "fill" }}
                        src="https://live.staticflickr.com/65535/52364926883_de6a3ded9e_c.jpg"
                    />
                </div>
            </div>
            <div
                id="loginCont"
                className="col-lg-6 p-5 d-flex flex-column rounded-end border-end border-top border-bottom bg-light justify-content-center"
            >
                <div className="d-flex flex-column justify-content-center">
                    <div className="mb-4 d-flex justify-content-center">
                        <h3 className="text-center">Login</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form
                            onSubmit={handleLogin}
                            id="loginForm"
                            className="d-flex flex-column gap-4"
                        >
                            <div className="d-flex gap-2 flex-column">
                                <label htmlFor="email" className="m-0 form-label ">
                                    <span className="">Email</span>
                                </label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control login-form"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className=" form-label">
                                    <span className="  ">Password</span>
                                </label>
                                <input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control login-form"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="forgotCont" className="row d-flex justify-content-center gap-2 mt-4">
                        <div
                            style={{ cursor: "pointer" }}
                            className="text-center col-lg-6 p-0 fw-bold"
                        >
                            <Link to={"/reset-password"}>Forgot Password</Link>
                        </div>
                        <div style={{ cursor: "pointer" }} className="text-center col-lg-6 fw-bold">
                            <Link to={"/register"}>Register</Link>
                        </div>
                        <div
                            style={{ cursor: "pointer", color: "purple" }}
                            className="text-center col-lg-6 fw-bold text-danger"
                        >
                            <Link to={"/admin-login"}>Admin Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
