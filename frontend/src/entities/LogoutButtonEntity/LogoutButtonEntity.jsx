import { useStateContext } from "../../processes/ContextProvider/ContextProvider";
import axiosClient from "../../app/axios-client";
import DefaultButton from "../../shared/DefaultButton/DefaultButton";

export default function LogoutButtonEntity(props) {
    const { user, token } = useStateContext();
    const onClick = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/logout", user)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.reload();
    };
    return (
        <>
            <DefaultButton onClick={onClick}>Logout</DefaultButton>
        </>
    );
}
