import { useEffect } from "react";

export const addDynCSS = () => {
    return {
        dymensions: function (name, syllable = 0) {
            return {
                width: function () {
                    let wDimHandler = () => {
                        document.body.style.setProperty(
                            "--" + name + "-width",
                            window.innerWidth + syllable + "px"
                        );
                    };
                    useEffect(() => {
                        document.body.style.setProperty(
                            "--" + name + "-width",
                            window.innerWidth + syllable + "px"
                        );
                        removeEventListener("resize", wDimHandler);
                        addEventListener("resize", wDimHandler);
                    }, []);
                    return <></>;
                },
                height: function () {
                    let wDimHandler = () => {
                        document.body.style.setProperty(
                            "--" + name + "-height",
                            window.innerHeight + syllable + "px"
                        );
                    };
                    useEffect(() => {
                        document.body.style.setProperty(
                            "--" + name + "-height",
                            window.innerHeight + syllable + "px"
                        );
                        removeEventListener("resize", wDimHandler);
                        addEventListener("resize", wDimHandler);
                    }, []);
                    return <></>;
                },
            };
        },
    };
};

export const click = (dom) => {
    
    

    useEffect(() => {

    }, [])
}

export default function Listeners(props) {
    let wDimHandler = () => {
        document.body.style.setProperty(
            "--cur-width",
            window.innerWidth + "px"
        );
        document.body.style.setProperty(
            "--cur-height",
            window.innerHeight + "px"
        );
    };

    useEffect(() => {
        document.body.style.setProperty(
            "--cur-width",
            window.innerWidth + "px"
        );
        document.body.style.setProperty(
            "--cur-height",
            window.innerHeight + "px"
        );
        removeEventListener("resize", wDimHandler);
        addEventListener("resize", wDimHandler);
    }, []);
    return <></>;
}
