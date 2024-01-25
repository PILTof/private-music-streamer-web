import "./styles.css";
import ManageAllFiles from "./ManageAllFiles/ManageAllFiles";
import DefaultTabs from "../../../shared/DefaultTabs/DefaultTabs";
import ManageViewer from "./ManageViewer/ManageViewer";
import ManagePlaylists from "./ManagePlaylists/ManagePlaylists";
import UploadShowEntity from "../../../entities/UploadShowEntity/UploadShowEntity";
export default function ManagePage({ ajaxResult, setAjaxResult }) {
    const tabNames = ["View files", "Playlists", "Edit Files"];
    return (
        <div className="manage-page-wrwapp">
            <DefaultTabs
                additionalButtons={<UploadShowEntity>Add Tracks</UploadShowEntity>}
                fristOpenTab={0}
                tabNames={tabNames}
            >
                <ManageViewer ajaxResult={ajaxResult}></ManageViewer>
                <ManagePlaylists ajaxResult={ajaxResult}></ManagePlaylists>
                <ManageAllFiles
                    ajaxResult={ajaxResult}
                    setAjaxResult={setAjaxResult}
                ></ManageAllFiles>
            </DefaultTabs>
        </div>
    );
}
