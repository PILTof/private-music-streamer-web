import "./styles.css";
import ErrorPlash from "../../shared/ErrorPlash/ErrorPlash";
import MessagePlash from "../../shared/MessagePlash/MessagePlash";

export default function UploadLogEntity({ ajaxResult }) {
    return (
        <div className="upload-log-entity-wrapp">
            <p>Upload Logs</p>
            <div className="break-line"></div>
            {ajaxResult &&
                ajaxResult.length > 0 &&
                ajaxResult.map((el) => {
                    if (el.error && el.error.length > 0) {
                        return (
                            <div key={el.data.id}>
                                <br />
                                <ErrorPlash>
                                    <div>{el.error};</div>
                                    <span>{el.data.file_type}</span>
                                </ErrorPlash>
                            </div>
                        );
                    } else if (el.message && el.message.length > 0) {
                        return (
                            <div key={el.data.id}>
                                <br />
                                <MessagePlash>
                                    <div>{el.message};</div>
                                    <span>{el.data.file_type}</span>
                                </MessagePlash>
                            </div>
                        );
                    }
                })}
        </div>
    );
}
