import DragDropFile from "../../widgets/DragNDrop/DragNDrop";
import { ajaxPushImgFiles, ajaxUploadTmpImg } from "./script";

export default function UploadPlaylistImgEntity({ getTmpImg, setTmpImage }) {
    function handleDropfunction(event) {
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            ajaxUploadTmpImg(event.dataTransfer.files)
                .then((res) => {
                    console.log("result");
                    console.log(res);
                    getTmpImg(res[0]);
                })
                .catch((err) => {
                    console.log("Error");
                    console.log(err);
                });
            // ajaxPushImgFiles(event.dataTransfer.files, '/').then((res) => {
            //     setAjaxResult(res);
            //     ajaxGet()
            //     console.log(res);
            // });
        }
    }
    function handleChangefunction(event) {
        if (event.target.files && event.target.files[0]) {
            ajaxUploadTmpImg(event.target.files)
                .then((res) => {
                    console.log("result");
                    console.log(res);
                    getTmpImg(res[0]);
                })
                .catch((err) => {
                    console.log("Error");
                    console.log(err);
                });
            // ajaxPushImgFiles(event.target.files, '/').then((res) => {
            //     setAjaxResult(res);
            //     ajaxGet()
            //     console.log(res);
            // });
        }
    }
    return (
        <>
            <DragDropFile
                setTmpImage={setTmpImage}
                handleDropfunction={handleDropfunction}
                handleChangefunction={handleChangefunction}
            ></DragDropFile>
        </>
    );
}
