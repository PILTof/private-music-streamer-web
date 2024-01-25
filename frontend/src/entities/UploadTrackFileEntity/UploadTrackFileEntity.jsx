import DragDropFile from "../../widgets/DragNDrop/DragNDrop.jsx";
import { ajaxPushMusicFiles } from "./script.js";

export default function UploadTrackFileEntity({ setAjaxResult, ajaxGet }) {
    function handleDropfunction (event) {
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            ajaxPushMusicFiles(event.dataTransfer.files, '/').then((res) => {
                setAjaxResult(res);
                ajaxGet()
                console.log(res);
            });
        }
    }
    function handleChangefunction (event) {
        if (event.target.files && event.target.files[0]) {
            ajaxPushMusicFiles(event.target.files, '/').then((res) => {
                setAjaxResult(res);
                ajaxGet()
                console.log(res);
            });
        }
    }
    return (
        <>
            <DragDropFile
                handleDropfunction={handleDropfunction}
                handleChangefunction={handleChangefunction}
            ></DragDropFile>
        </>
    );
}
