import { useState } from "react";
import UploadLogEntity from "../../../entities/UploadLogEntity/UploadLogEntity";
import { useStateContext } from "../../../processes/ContextProvider/ContextProvider";
import DragDropFile from "../../../widgets/DragNDrop/DragNDrop";
import "./styles.css";
import UploadTrackFileEntity from "../../../entities/UploadTrackFileEntity/UploadTrackFileEntity";
export default function UploadPage({ajaxGet}) {
    const [ajaxResult, setAjaxResult] = useState();
    return (
        <>
            <div className="admin-uload-block hide" style={{display:'none'}}>
                <UploadTrackFileEntity setAjaxResult={setAjaxResult} ajaxGet={ajaxGet}></UploadTrackFileEntity>
                <UploadLogEntity ajaxResult={ajaxResult}></UploadLogEntity>
            </div>
        </>
    );
}
