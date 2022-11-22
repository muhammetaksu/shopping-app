import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../env/config";
import { toast } from "react-toastify";

function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const user = {
        name: name,
        surname: surname,
        email: email,
        password: password,
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!(password === confirmPassword)) {
            toast.warning("Passwords don't match!");
        } else if (name && surname && email === "") {
            toast.warning("Name, surname or email cannot be blank!");
        } else {
            const response = new Promise((resolve, reject) => {
                resolve(axios.post(`${API_URL}users`, user));
            });

            try {
                await toast.promise(response, {
                    pending: {
                        render() {
                            return "Registering...";
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
                console.log(error);
            }
        }
    };

    return (
        <div className="registerPageCont container row d-flex justify-content-center m-auto py-3">
            <div
                id="registerCont"
                className="col-lg-6 p-5 d-flex flex-column rounded-start border-start border-top border-bottom bg-light justify-content-center"
            >
                <div className="d-flex flex-column justify-content-center">
                    <div className="mb-4 d-flex justify-content-center">
                        <h3 className="text-center">Register</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form
                            onSubmit={handleRegister}
                            id="loginForm"
                            className="d-flex flex-column gap-2"
                        >
                            <div className="d-flex gap-1 flex-column">
                                <label htmlFor="name" className="m-0 form-label ">
                                    <span className="">Name</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    className="form-control auth-form-input"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value.charAt(0).toUpperCase() +
                                                e.target.value
                                                    .substring(1, e.target.value.length)
                                                    .toLowerCase()
                                        )
                                    }
                                />
                            </div>
                            <div className="d-flex gap-1 flex-column">
                                <label htmlFor="surname" className="m-0 form-label ">
                                    <span className="">Surname</span>
                                </label>
                                <input
                                    id="surname"
                                    name="surname"
                                    className="form-control auth-form-input"
                                    autoComplete="off"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value.toUpperCase())}
                                />
                            </div>
                            <div className="d-flex gap-1 flex-column">
                                <label htmlFor="email" className="m-0 form-label ">
                                    <span className="">Email</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control auth-form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="d-flex gap-1 flex-column">
                                <label htmlFor="password" className="m-0  form-label">
                                    <span className="  ">Password</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="off"
                                    className="form-control auth-form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-flex gap-1 flex-column">
                                <label htmlFor="confirmPassword" className=" form-label m-0">
                                    <span className="  ">Confirm Password</span>
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

                            <div className="d-flex justify-content-center mt-2">
                                <button className="btn btn-primary" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="forgotCont" className="row d-flex justify-content-center gap-2 mt-4">
                        <p className="text-center col-lg-6 p-0">Already have an account?</p>
                        <div
                            style={{ cursor: "pointer" }}
                            className="text-center fw-bold col-lg-6 "
                        >
                            <Link to={"/login"}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 d-flex rounded-end border-end border-top border-bottom">
                <div id="imgCont" className=" m-auto">
                    <div>
                        <img
                            id="registerImg"
                            src="https://live.staticflickr.com/65535/52364701191_5bef2751d6_k.jpg"
                            alt="register"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
