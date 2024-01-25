import $ from "jquery";
import "./styles.css";
import UploadPlaylistImgEntity from "../UploadPlaylistImgEntity/UploadPlaylistImgEntity";
import { useRef, useState } from "react";
import Search from "../../features/Search/Search";
import PlaylistAddSearchEntity from "../PlaylistAddSearchEntity/PlaylistAddSearchEntity";
import DefaultButton from "../../shared/DefaultButton/DefaultButton";
import { BACKEND_SERVER_LINK } from "../../app/globalConstants";
import { ajaxCreatePlayList } from "./script";
import { ajaxAddPlyalist } from "../../pages/AdminPage/ManagePage/ManagePlaylists/script";
export default function AddPlayListModalEntity({ ajaxResult, closeFun }) {
    const [formData, setformData] = useState(null);
    const [tmpImg, getTmpImg] = useState();
    const nameRef = useRef();
    const descRef = useRef();
    const getSelected = () => {
        let res = [];
        let inputs = $(`tr[id*="_track"]`);
        inputs.each((i, el) => {
            if ($(el).children().find("input")[0].checked) {
                let trackId = $(el).attr("data-value");
                res.push(trackId);
            }
        });
        return res;
    };

    const sendAjax = () => {
        let selectedIDS = getSelected();
        let name = nameRef.current.value;
        let desc = descRef.current.value;
        let checkThis = {
            selected: selectedIDS,
            name: name,
            desc: desc,
            imageUrl: tmpImg,
        };
        let error = "";
        for (const key in checkThis) {
            if (Object.hasOwnProperty.call(checkThis, key)) {
                const el = checkThis[key];
                switch (key) {
                    case "selected":
                        if (!el) {
                            error += " Выберите треки ";
                        }
                        break;
                    case "name":
                        if (!el) {
                            error += " Укажите имя ";
                        }
                        break;
                    case "desc":
                        if (!el) {
                            error += " Укажите описание ";
                        }
                        break;
                    case "imageUrl":
                        if (!el) {
                            error += " Добавьте изображение ";
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        if (error) {
            alert(error);
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("selected", selectedIDS);
        formData.append("imageUrl", tmpImg);

        ajaxAddPlyalist(formData)
            .then((res) => {
                console.log(res);
                closeFun(false)
                window.location.reload()
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="add-play-list-wrapp">
                <div>
                    <UploadPlaylistImgEntity
                        setTmpImage={tmpImg}
                        getTmpImg={getTmpImg}
                    ></UploadPlaylistImgEntity>
                    <div className="add-play-list">
                        <div>
                            <label htmlFor="add-playlist-name">
                                Playlist Name
                            </label>
                            <input
                                ref={nameRef}
                                id="add-playlist-name"
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="add-playlist-description">
                                Playlist Desc
                            </label>
                            <input
                                ref={descRef}
                                id="add-playlist-description"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <PlaylistAddSearchEntity
                    ajaxResult={ajaxResult}
                ></PlaylistAddSearchEntity>
                <DefaultButton onClick={sendAjax} type={"submit"}>
                    Create Playlist
                </DefaultButton>
            </div>
        </>
    );
}
