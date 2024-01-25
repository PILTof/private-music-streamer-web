import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { ajaxDelEl, ajaxGetFiles, ajaxSetDir } from "./script";
import DefaultButton from "../../../../shared/DefaultButton/DefaultButton";
export default function ManageAllFiles({ ajaxResult, setAjaxResult }) {
    const [filterName, setFilterName] = useState("");
    const [catalogFilter, setCatalogFilter] = useState("");

    const setCatalogFilter_ = (ev) => {
        let value = ev.target.value;
        if (value.match(/\[/g) || value.match(/\]/g)) {
            alert("wrong");
            return;
        }
        setCatalogFilter(value);
    };
    const setFilterName_ = (ev) => {
        let value = ev.target.value;
        if (value.match(/\[/g) || value.match(/\]/g)) {
            alert("wrong");
            return;
        }
        setFilterName(value);
    };

    const ajaxGet = () => {
        ajaxGetFiles().then((res) => {
            setAjaxResult(res);
        });
    };

    // useEffect(() => {
    //     ajaxGet();
    // }, []);
    const onClick = (el) => {
        // ajaxSetDir(el.id, el.file_dir)
    };
    const onSubmit = (ev) => {
        let res = [];
        console.clear();
        ev.preventDefault();
        let counter = 0;
        const fields = ev.target.getElementsByTagName("input");
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            counter++;
            if (counter == 2) {
                counter = 0;
                if (field.id.match(/checkbox/g) && field.checked) {
                    let dir = fields[i - 1].value;
                    if (!dir) {
                        console.error("dir is null", fields[i - 1]);
                        return false;
                    }
                    let clean_dir = dir.replace(/[ \t\v\r\n\f]/g, "_");
                    let id = fields[i - 1].id.replace(/.*_/g, "");
                    res.push({ id: id, dir: clean_dir });
                }
            }
        }
        if (res.length > 0) {
            ajaxSetDir(res);
            ajaxGet();
        } else {
            return false;
        }
    };
    const onBeforeInput = (ev) => {
        if (!ev.data.match(/^\//g) && !ev.target.value.match(/^\//g)) {
            ev.preventDefault();
            let id = ev.target.id.replace(/.*_/g, "");
            document.querySelector(
                `#track_change_checkbox_${id}`
            ).checked = false;
            ev.target.style.color = "red";
            setTimeout(() => {
                ev.target.style.color = "black";
            }, 1000);
        } else if (ev.target.value.match(/\/$/g) && ev.data.match(/\//g)) {
            ev.preventDefault();
            let id = ev.target.id.replace(/.*_/g, "");
            document.querySelector(
                `#track_change_checkbox_${id}`
            ).checked = false;
            ev.target.style.color = "red";
            setTimeout(() => {
                ev.target.style.color = "black";
            }, 1000);
        } else if (
            ev.data.match(/\$/g) ||
            ev.data.match(/\,/g) ||
            ev.data.match(/\[/g) ||
            ev.data.match(/\]/g) ||
            ev.data.match(/\\/g) ||
            ev.data.match(/\!/g)
        ) {
            ev.preventDefault();
            let id = ev.target.id.replace(/.*_/g, "");
            document.querySelector(
                `#track_change_checkbox_${id}`
            ).checked = false;
            ev.target.style.color = "red";
            setTimeout(() => {
                ev.target.style.color = "black";
            }, 1000);
        } else if (ev.data) {
            let id = ev.target.id.replace(/.*_/g, "");
            document.querySelector(
                `#track_change_checkbox_${id}`
            ).checked = true;
        }
    };
    const switchCheckbox = (ev) => {
        let checkAll = ev.target.checked;
        let allCheckboxes = document.querySelectorAll(
            'input[id*="track_change_checkbox_"]'
        );
        for (let i = 0; i < allCheckboxes.length; i++) {
            const checkbox = allCheckboxes[i];
            checkbox.checked = checkAll;
        }
    };
    const deleteElement = (el, ev) => {
        ev.preventDefault();
        ajaxDelEl(el.id).then((res) => console.log(res));
        ajaxGet();
    };

    return (
        <>
            <form
                onSubmit={(ev) => onSubmit(ev)}
                id="change_selected_files"
                action=""
            >
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    onChange={(ev) => setFilterName_(ev)}
                                    type="text"
                                />
                            </th>
                            <th>
                                <input
                                    onChange={(ev) => setCatalogFilter_(ev)}
                                    type="text"
                                />
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Catalog</th>
                            <th>Size</th>
                            <th>Mime</th>
                            <th>Check</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ajaxResult &&
                            ajaxResult
                                .filter((el, index) => {
                                    let fileDir = el.file_dir;
                                    let fileName = el.file_name;
                                    if (
                                        fileName.match(
                                            new RegExp(filterName, "gi")
                                        ) &&
                                        fileDir.match(
                                            new RegExp(catalogFilter, "gi")
                                        )
                                    ) {
                                        return el;
                                    }
                                })
                                .map((el) => {
                                    return (
                                        <tr
                                            onClick={() => onClick(el)}
                                            className="file_name"
                                            key={el.id}
                                        >
                                            <td scope="row">
                                                {el.file_name.replace(
                                                    /.*\//,
                                                    ""
                                                )}
                                            </td>
                                            <th>
                                                <input
                                                    onBeforeInput={(ev) =>
                                                        onBeforeInput(ev)
                                                    }
                                                    placeholder={el.file_dir}
                                                    type="text"
                                                    id={
                                                        "track_dir_input_" +
                                                        el.id
                                                    }
                                                />
                                            </th>
                                            <th>{el.file_size}</th>
                                            <th>{el.file_type}</th>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    name={
                                                        "track_change_checkbox_" +
                                                        el.id
                                                    }
                                                    id={
                                                        "track_change_checkbox_" +
                                                        el.id
                                                    }
                                                />
                                            </th>
                                            <th>
                                                <button
                                                    onClick={(ev) =>
                                                        deleteElement(el, ev)
                                                    }
                                                >
                                                    del
                                                </button>
                                            </th>
                                        </tr>
                                    );
                                })}
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th style={{ display: "flex", columnGap: 10 }}>
                                <input
                                    onChange={(ev) => switchCheckbox(ev)}
                                    type="checkbox"
                                    name="uncheck_all"
                                    id="uncheck_all"
                                />
                                <label htmlFor="uncheck_all">Check all</label>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="save-button-wrapp">
                    <DefaultButton type={"submit"}>Save</DefaultButton>
                </div>
            </form>
        </>
    );
}
