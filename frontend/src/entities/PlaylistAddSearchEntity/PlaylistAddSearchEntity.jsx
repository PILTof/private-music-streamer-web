import "./styles.css";
import { FILE_MUSIC_UPLOAD_DIR } from "../../app/globalConstants";
import Search from "../../features/Search/Search";
import { Content } from "../ContentArrayEntity/script";
import { useRef, useState } from "react";
import $ from 'jquery'

export default function PlaylistAddSearchEntity({ ajaxResult }) {
    const input = useRef();
    const tracks = ajaxResult;
    let dryContent = Content({
        input: tracks,
        filters: {
            // size: "<20",
            name: ``,
        },
    });
    const onChange = () => {
        let curval = input.current.value ? input.current.value : "";
        dryContent = Content({
            input: tracks,
            filters: {
                // size: "<20",
                name: curval,
            },
        });
        console.clear()
        $(`tr[id*="_track"]`).each((i, el) => {
            $(el).hide()
        })
        dryContent.forEach((track, i) => {
            $(`tr[id*="${track.id}_track"]`).each((i, el) => {
                $(el).show()
            })
        })
    };
    
    const onSelectInput = (ev, elId) => {
        let size = Content({input:tracks, filters: {id: ev.currentTarget.selectedOptions[0].value}})[0].size
        $(`#${elId}_size`).text(size)
        $(`#${elId}_track`).attr('data-value', ev.currentTarget.selectedOptions[0].value)
    }

    

    let wetContent = () => {
        let same = {};
        dryContent.map((el, i) => {
            if (same.hasOwnProperty(el.name)) {
                same[el.name].push(el);
            } else {
                same[el.name] = [];
                same[el.name].push(el);
            }
        });
        let spent = {};
        let trArray = dryContent.map((el, i) => {
            spent[el.name] =
                spent[el.name] == undefined ? 0 : spent[el.name] + 1;
            if (spent[el.name] < 1) {
                return (
                    <tr data-value={el.id} id={`${el.id}_track`} key={el.id}>
                        <th key={el.id + "_name"}>
                            {el.name.replace(FILE_MUSIC_UPLOAD_DIR, "")}
                        </th>
                        <th key={el.id + "_type"}>
                            <select
                                onInput={(ev) => onSelectInput(ev, el.id)}
                                name={`${el.id}_type_select`}
                                id={`${el.id}_type_select`}
                            >
                                {same.hasOwnProperty(el.name) &&
                                    same[el.name].map((trackEl) => {
                                        return (
                                            <option
                                                key={trackEl.id}
                                                value={trackEl.id}
                                            >
                                                {trackEl.type}
                                            </option>
                                        );
                                    })}
                            </select>
                        </th>
                        <th  id={el.id + "_size"} key={el.id + "_size"}>
                            {el.size}
                        </th>
                        <th key={el.id + "_check"}>
                            <input
                                type="checkbox"
                                name={`${el.id}_select_track`}
                                id={`${el.id}_select_track`}
                            />
                        </th>
                    </tr>
                );
            }
        });
        return trArray;
    };
    const [finalContent, setFinalContent] = useState(wetContent());

    return (
        <>
            <Search
                onChange={() => onChange()}
                inputRef={input}
                keyid={"playlist_add"}
            >
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>type</th>
                            <th>size</th>
                            <th>select</th>
                        </tr>
                    </thead>
                    <tbody>{finalContent}</tbody>
                </table>
            </Search>
        </>
    );
}
