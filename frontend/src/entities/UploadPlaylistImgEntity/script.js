import axiosClient from "../../app/axios-client";

const img_mimetypes = (type) => {
    switch (type) {
        case "image/gif":
            return true;
        case "image/jpeg":
            return true;
        case "image/pjpeg":
            return true;
        case "image/png":
            return true;
        case "image/svg+xml":
            return true;
        case "image/tiff":
            return true;
        case "image/vnd.microsoft.icon":
            return true;
        case "image/vnd.wap.wbmp":
            return true;
        case "image/webp":
            return true;
    }
};

export const ajaxPushImgFiles = async (files, dir) => {
    const result = [];
    for (const file in files) {
        if (Object.hasOwnProperty.call(files, file)) {
            const formData = new FormData();
            const el = files[file];
            if (img_mimetypes(el.type)) {
                formData.append("files", el);
                await axiosClient
                    .post("/add_tracks", formData)
                    .then((res) => {
                        result.push(res.data);
                    })
                    .catch((err) => {
                        result.push(err.response.data);
                    });
            } else {
                result.push({
                    data: {
                        id: Date.now(),
                        file_name: el.name,
                        file_type: el.type,
                    },
                    error: `Файл "${el.name}" не поддерживаемого формата`,
                });
            }
        }
    }
    return result;
};

export const ajaxUploadTmpImg = async (files) => {
    const result = [];
    for (const file in files) {
        if (Object.hasOwnProperty.call(files, file)) {
            const formData = new FormData();
            const el = files[file];
            if (img_mimetypes(el.type)) {
                formData.append("files", el);
                await axiosClient
                    .post("/admin/uploadTmpImg", formData)
                    .then((res) => {
                        result.push(res.data);
                    })
                    .catch((err) => {
                        result.push(err.response.data);
                    });
            } else {
                result.push({
                    data: {
                        id: Date.now(),
                        file_name: el.name,
                        file_type: el.type,
                    },
                    error: `Файл "${el.name}" не поддерживаемого формата`,
                });
            }
        }
    }
    return result;
};
