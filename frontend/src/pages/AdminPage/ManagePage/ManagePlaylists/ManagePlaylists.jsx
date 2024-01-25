import { useEffect, useState } from "react";
import "./styles.css";
import { ajaxGetPlaylist, ajaxGetPlaylists } from "./script";
import playlist_svg from "../../../../../public/playlist.svg";
import add_playlsit_svg from "../../../../../public/add-playlist.svg";
import Modal from "../../../../features/Modal/Modal";
import $ from "jquery";
import AddPlayListModalEntity from "../../../../entities/AddPlayListModal/AddPlayListModalEntity";
import { BACKEND_SERVER_LINK } from "../../../../app/globalConstants";
export default function ManagePlaylists({ ajaxResult }) {
    // console.clear();
    // console.log(ajaxResult)
    const [playLists, setPlayLists] = useState([]);
    const [playList, setPlaylist] = useState(null);
    const [modalAddPlayList, setmodalAddPlayList] = useState(false);
    let dirs = [];
    const getRandomColor = () => {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getAllDirs = () => {
        if (ajaxResult) {
            ajaxResult.forEach((el, i) => {
                dirs.push(el.file_dir);
            });
            new RegExp("", "g");
        }
    };
    useEffect(() => {
        getAllDirs();
        let res = [];
        ajaxGetPlaylists().then((ajaxRes) => {
            for (const list in ajaxRes) {
                if (Object.hasOwnProperty.call(ajaxRes, list)) {
                    const el = ajaxRes[list];
                    console.log(el)
                    res.push(
                        <div
                            onClick={() => {
                                getPlaylist(el.tracks.split(","));
                            }}
                            className="playlist-item"
                            id={"list_" + el.id}
                            key={el.id}
                        >
                            { !el.img_path ?  (<div
                                style={{ backgroundColor: getRandomColor() }}
                                className="img-wrapper "
                            >
                                <img src={playlist_svg} alt="" />
                            </div>) : 
                            (
                                <div className="img-wrapper loaded">
                                    <img src={BACKEND_SERVER_LINK+el.img_path} alt="" />
                                </div>
                            )
                            
                            }

                            <div style={{ padding: 10 }}>
                                <h4>{el.name}</h4>
                                <p className="playlist-desc">{el.desc}</p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div></div>
                                    <h4 style={{ color: "grey" }}>
                                        {el.tracks.split(',').length}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
            res.push(
                <div
                    key={"add_playlist"}
                    onClick={() =>
                        setmodalAddPlayList(modalAddPlayList ? false : true)
                    }
                    className="playlist-item-add"
                >
                    <img height={40} width={40} src={add_playlsit_svg} alt="" />
                </div>
            );
            setPlayLists(res);
        });
    }, []);

    const getPlaylist = (tracks) => {
        ajaxGetPlaylist({ tracks: tracks }).then((res) => {
            let result = [];
            for (const track in res.data) {
                if (Object.hasOwnProperty.call(res.data, track)) {
                    const trackData = res.data[track];
                    result.push(
                        <div key={"track_" + trackData.id}>
                            {trackData.file_name
                                .replace(/.*\//g, "")
                                .replace(/\.mp3/g, "")}
                        </div>
                    );
                }
            }
            setPlaylist(result);
        });
    };
    return (
        <>
            <Modal display={modalAddPlayList} closeFun={setmodalAddPlayList}>
                <AddPlayListModalEntity closeFun={setmodalAddPlayList} ajaxResult={ajaxResult}></AddPlayListModalEntity>
            </Modal>
            <div id="manage-playlists" className="manage-playlists-wrapp">
                <div className="manage-playlists">{playLists}</div>
                {playList && <div className="playlist">{playList}</div>}
            </div>
        </>
    );
}
