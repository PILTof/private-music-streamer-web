import $ from "jquery";
import { useState } from "react";
import "./styles.css";
import UploadShowEntity from "../../entities/UploadShowEntity/UploadShowEntity";
export default function DefaultTabs({
    children,
    tabNames,
    fristOpenTab = 0,
    additionalButtons,
}) {
    const [activeTab, setActiveTab] = useState(fristOpenTab);
    const onClick = ({ target }) => {
        let tabNum = target.className.replace(/.*\_/, "");
        console.log(tabNum);
        setActiveTab(tabNum);

        let allTabs = $(target.parentNode).find("div");
        for (let i = 0; i < allTabs.length; i++) {
            const tab = allTabs[i];
            let tabNum = tab.className.replace(/.*\_/, "");
            tab.className = `tab active_${tabNum}`;
        }
        target.className = `tab active active_${tabNum}`;
    };

    let content = () => {
        let res = [];
        if (children && children.length) {
            for (let i = 0; i < children.length; i++) {
                if (i == fristOpenTab) {
                    res.push(
                        <div
                            key={i + "_tab"}
                            onClick={(ev) => onClick(ev)}
                            className={`tab active active_${i}`}
                        >
                            {tabNames[i] ? tabNames[i] : "Tab"}
                        </div>
                    );
                } else {
                    res.push(
                        <div
                            key={i + "_tab"}
                            onClick={(ev) => onClick(ev)}
                            className={`tab active_${i}`}
                        >
                            {tabNames[i] ? tabNames[i] : "Tab"}
                        </div>
                    );
                }
                if (children.length !== i + 1) {
                    res.push(
                        <span
                            key={i + "_underline"}
                            className="tab-underline"
                        ></span>
                    );
                } else {
                    res.push(
                        <span
                            key={i + "_underline"}
                            className="tab-underline-end"
                        ></span>
                    );
                }
            }
        } else if (children) {
            res.push(
                <div
                    key={0 + "_tab"}
                    onClick={(ev) => onClick(ev)}
                    className={`tab active active_${0}`}
                >
                    {tabNames[0] ? tabNames[0] : "Tab"}
                </div>
            );
        } else {
            tabNames.forEach((name, index) => {
                res.push(
                    <div
                        key={index + "_tab"}
                        onClick={(ev) => onClick(ev)}
                        className={`tab active active_${index}`}
                    >
                        {name}
                    </div>
                );
                if (tabNames.length !== index + 1) {
                    res.push(
                        <span
                            key={index + "_underline"}
                            className="tab-underline"
                        ></span>
                    );
                } else {
                    res.push(
                        <span
                            key={index + "_underline"}
                            className="tab-underline-end"
                        ></span>
                    );
                }
            });
        }

        return res;
    };

    return (
        <div>
            <div className="default-tabs-wrapp">
                <div className="tab-container">{content()}</div>
                <div>{additionalButtons}</div>
            </div>
            {children && children.length ? children[activeTab] : children}
        </div>
    );
}
