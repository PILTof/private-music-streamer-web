import { FILE_MUSIC_UPLOAD_DIR } from "../../app/globalConstants";
import { formatBytes } from "../../app/globalFunctions";

export const Content = (params) => {
    let res = [];

    for (const key in params.input) {
        if (Object.hasOwnProperty.call(params.input, key)) {
            const dataTrack = params.input[key];
            res.push({
                name: dataTrack.file_name
                    .replace(FILE_MUSIC_UPLOAD_DIR, "")
                    .replace(/\.(?!.*\.).*/g, ""),
                size: formatBytes(dataTrack.file_size, 1),
                type: dataTrack.file_type,
                id: dataTrack.id,
            });
        }
    }
    let filtred = {};
    if (
        params &&
        params.hasOwnProperty("filters") &&
        typeof params.filters == "object"
    ) {
        for (const filt in params.filters) {
            if (Object.hasOwnProperty.call(params.filters, filt)) {
                const val = params.filters[filt];
                switch (val.replace(/(?!^).*/g, "")) {
                    case ">":
                        res = res.filter((track) => {
                            if (track.hasOwnProperty(filt)) {
                                let num = Number(
                                    track[filt].replace(/ .*/g, "")
                                );
                                if (num > Number(val.substring(1))) {
                                    return track;
                                }
                            }
                        });

                        break;
                    case "<":
                        res = res.filter((track) => {
                            if (track.hasOwnProperty(filt)) {
                                let num = Number(
                                    track[filt].replace(/ .*/g, "")
                                );
                                if (num < Number(val.substring(1))) {
                                    return track;
                                }
                            }
                        });

                        break;

                    default:
                        if(val != "") {
                            res = res.filter((track) => {
                                if (track.hasOwnProperty(filt)) {
                                    let regex = new RegExp(val, "gi");
                                    if (typeof track[filt] === "string" && track[filt].match(regex)) {
                                        return track;
                                    } else if (Number(track[filt]) === Number(val)) {
                                        return track;
                                    }
                                }
                            });
                        }
                        break;
                }
            }
        }
    }
    return res;
};
