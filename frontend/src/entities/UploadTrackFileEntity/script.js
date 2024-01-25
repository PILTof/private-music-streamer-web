import axiosClient from "../../app/axios-client";
import { music_mimetypes } from "../../app/globalFunctions";


export const ajaxPushMusicFiles = async (files, dir) => {
    const result = [];
    for (const file in files) {
        if (Object.hasOwnProperty.call(files, file)) {
            const formData = new FormData();
            const el = files[file];
            if (music_mimetypes(el.type)) {
                formData.append("files", el);
                formData.append("dir", dir);
                await axiosClient
                    .post("/add_tracks", formData)
                    .then((res) => {
                        result.push(res.data);
                    })
                    .catch((err) => {
                        result.push(err.response.data);
                    });
            } else {
                result.push({data: {id: Date.now(), file_name: el.name, file_type: el.type}, error: `Файл "${el.name}" не поддерживаемого формата`})
            }
        }
    }
    return result;
};
