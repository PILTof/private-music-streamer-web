import { Navigate } from "react-router-dom";
import { useStateContext } from "../../processes/ContextProvider/ContextProvider";
import "./styles.css";
import { useRef, useState } from "react";
import axiosClient from "../../app/axios-client.js";

export default function AuthPage(props) {
    const { user, token, setUser, setToken } = useStateContext();
    const name = useRef(null);
    const password = useRef(null);
    const onCLick = (ev) => {
        ev.preventDefault();
        let arFields = {
            name: name.current.value,
            password: password.current.value,
        };
        axiosClient
            .post("/login", arFields)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem('ACCESS_TOKEN', data.token)
                window.location.reload();
            })
            .catch((err) => {
                const response = err.response;
                if(response && response.status == 422) {
                    console.log(response.data.errors);
                }
                console.log(err)
            });
    };

    if (token !== null) {
        return <Navigate to={"/admin"}></Navigate>;
    }

    return (
        <div className="auth-wrapper">
            {token}
            <form action="">
                <div>
                    <div>
                        <label htmlFor="name"> name </label>
                        <input
                            ref={name}
                            type="text"
                            id="name"
                            name="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="passwrod">Password</label>
                        <input
                            ref={password}
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <button type="submit" onClick={onCLick}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
