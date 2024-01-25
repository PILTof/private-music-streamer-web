import "./styles.css";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../processes/ContextProvider/ContextProvider";
import DragDropFile from "../../widgets/DragNDrop/DragNDrop";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import UploadLogEntity from "../../entities/UploadLogEntity/UploadLogEntity";
import LogoutButtonEntity from "../../entities/LogoutButtonEntity/LogoutButtonEntity";
import Header from "../../features/Header/Header";
import UploadPage from "./UploadPage/UploadPage";
import ManagePage from "./ManagePage/ManagePage";
import { ajaxGetFiles } from "./ManagePage/ManageAllFiles/script";
import DefaultButton from "../../shared/DefaultButton/DefaultButton";
import UploadShowEntity from "../../entities/UploadShowEntity/UploadShowEntity";

export default function AdminPage(props) {
    const { user, token } = useStateContext();
    const [ajaxResult, setAjaxResult] = useState();

    if (token == null) {
        return <Navigate to={"/auth"}></Navigate>;
    }

    const ajaxGet = () => {
        ajaxGetFiles().then((res) => {
            setAjaxResult(res);
        });
    };
    useEffect(() => {
        ajaxGet();
    }, []);
    return (
        <div className="admin-wrapper">
            <Header></Header>
            <UploadPage ajaxGet={ajaxGet}></UploadPage>
            <ManagePage
                ajaxResult={ajaxResult}
                setAjaxResult={setAjaxResult}
            ></ManagePage>
        </div>
    );
}
