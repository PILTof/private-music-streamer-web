import $ from "jquery";
import { useRef, useState } from "react";
import "./styles.css";
import DefaultButton from "../../../../shared/DefaultButton/DefaultButton";
export default function ManageViewer({ ajaxResult }) {
    const [filterTags, setFilterTags] = useState([""]);
    const [filterName, setFilterName] = useState();
    console.clear();
    console.log(ajaxResult);
    console.log(filterTags);

    const addTagByClick = (ev) => {
        let tagText = ev.target.textContent.replace("#", "");
        if (filterTags.indexOf(tagText) >= 0) {
            console.log(`${filterTags} уже есть в фильтре`);
        } else {
            if (filterTags.length == 1 && filterTags[0] == "") {
                setFilterTags([tagText]);
            } else {
                setFilterTags([...filterTags, tagText]);
            }
        }
    };

    const tagsContent = (file_dir) => {
        let tags = [];
        let inputTags = file_dir.split("/");
        inputTags.forEach((tag, index) => {
            if (tag)
                tags.push(
                    <span
                        onClick={(ev) => addTagByClick(ev)}
                        className="file-tag"
                        key={index + "_file-tag"}
                    >
                        <span>#</span>
                        {tag}
                    </span>
                );
        });
        return tags;
    };
    const content = () => {
        return (
            <>
                {ajaxResult &&
                    ajaxResult
                        .filter((el, index) => {
                            let fileDir = el.file_dir;
                            let fileName = el.file_name;
                            let tagRes = false;
                            filterTags.forEach((tag) => {
                                if (fileDir.match(new RegExp(tag, "gi"))) {
                                    tagRes = true;
                                }
                            });
                            if (
                                fileName.match(new RegExp(filterName, "gi")) &&
                                tagRes
                            ) {
                                return el;
                            }
                        })
                        .map((el, index) => {
                            let fileDir = el.file_dir;
                            let fileName = el.file_name;
                            return (
                                <>
                                    <tr key={index + "_file"}>
                                        <th key={index + "_file_name"}>
                                            {fileName.replace(/.*\//, "")}
                                        </th>
                                        <th key={index + "_file_tags"}>
                                            {tagsContent(fileDir)}
                                        </th>
                                    </tr>
                                </>
                            );
                        })}
            </>
        );
    };

    const setFilterTags_ = (ev) => {
        let filterTags = $.grep(
            ev.target.value.replace(/ /g, "").split(","),
            (n) => n == 0 || n
        );
        filterTags ? setFilterTags(filterTags) : setFilterTags([""]);
    };
    const setFilterName_ = (ev) => {
        let value = ev.target.value;
        if (value.match(/\[/g) || value.match(/\]/g)) {
            alert("wrong");
            return;
        }
        setFilterName(value);
    };
    const allTags = () => {
        let res = [];
        if (ajaxResult) {
            ajaxResult.forEach((file) => {
                let tags = file.file_dir.split("/");
                tags.forEach((tag) => {
                    if (tag !== "") {
                        res.push(tag);
                    }
                });
            });
        }
        res = Array.from(new Set(res));
        return (
            <>
                {res.map((tag, index) => {
                    return (
                        <option value={tag} key={index + "_" + tag}>
                            {tag}
                        </option>
                    );
                })}
            </>
        );
    };
    return (
        <>
            <div className="content-filter">
                <div className="filter-label">Filters</div>
                <div className="tag-input">
                    <label htmlFor="tag_select_input">Tag</label>
                    <div>
                        <input
                            id="tag_select_input"
                            list="tag_select"
                            onChange={(ev) => setFilterTags_(ev)}
                            type="text"
                        />
                        <datalist name="tag_select" id="tag_select">
                            {allTags()}
                        </datalist>
                        <span> </span>
                        <DefaultButton
                            onClick={() =>
                                setFilterTags_({ target: { value: "" } })
                            }
                        >
                            clear
                        </DefaultButton>
                    </div>
                </div>
                <div className="name-input">
                    <label htmlFor="name_filter">Name</label>
                    <input
                        onChange={(ev) => setFilterName_(ev)}
                        id="name_filter"
                        name="name_filter"
                        type="text"
                    />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Track</th>
                        <th>Tags</th>
                        <th>asdas</th>
                    </tr>
                </thead>
                <tbody>{content()}</tbody>
            </table>
        </>
    );
}
