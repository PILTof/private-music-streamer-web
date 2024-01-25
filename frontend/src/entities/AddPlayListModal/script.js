export const ajaxCreatePlayList = async (formData) => {
    const result = [];

    await axiosClient
        .post("/admin/uploadTmpImg", formData)
        .then((res) => {
            result.push(res.data);
        })
        .catch((err) => {
            result.push(err.response.data);
        });

    return result;
};
