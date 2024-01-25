import "./styles.css";
import $ from "jquery";
import DefaultButton from "../../shared/DefaultButton/DefaultButton";

export default function UploadShowEntity({ children }) {
    const EventHandler = (event) => {
        let uploadBlock = $(".admin-uload-block");
        uploadBlock.hide();
        uploadBlock[0].removeEventListener("transitionend", EventHandler);
    };

    const onClick = () => {
        let uploadBlock = $(".admin-uload-block");
        document.body.style = `--admin-upload-block-height: -${uploadBlock.height()}px;`;
        if (uploadBlock.hasClass("hide")) {
            uploadBlock[0].removeEventListener("transitionend", EventHandler);
            uploadBlock.show();
            uploadBlock.removeClass("hide");
        } else {
            uploadBlock.addClass("hide");
            uploadBlock[0].addEventListener("transitionend", EventHandler);
        }
    };

    return (
        <div className="admin-show-button">
            <DefaultButton onClick={onClick}>{children}</DefaultButton>
        </div>
    );
}
