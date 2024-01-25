import Stack from "react-bootstrap/Stack";
import "./style.css";
import { useRef, useState } from "react";
import { BACKEND_SERVER_LINK } from "../../app/globalConstants";

// drag drop file component
export default function DragDropFile({handleDropfunction, handleChangefunction, setTmpImage}) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleDropfunction(e);
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        handleChangefunction(e)
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <>
                <div className="form-file-upload-wrapp">
                    {setTmpImage && <img className='cover-image-preview' src={BACKEND_SERVER_LINK+setTmpImage} alt="" />}
                    <form
                        id={`form-file-upload`}
                        className={`form-file-upload ${setTmpImage ? "loaded" : ""}`}
                        onDragEnter={handleDrag}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            id="input-file-upload"
                            multiple={true}
                            onChange={handleChange}
                        />
                        <label
                            id="label-file-upload"
                            htmlFor="input-file-upload"
                            className={`${dragActive ? "drag-active" : ""} ${setTmpImage ? "loaded" : ""}`}
                        >
                            <div>
                                <p>Drag and drop your file here or</p>
                                <button
                                    className={`upload-button ${setTmpImage ? "loaded" : ""}`}
                                    onClick={onButtonClick}
                                >
                                    Upload a file
                                </button>
                            </div>
                        </label>
                        {dragActive && (
                            <div
                                id="drag-file-element"
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            ></div>
                        )}
                    </form>
                </div>
        </>
    );
}
