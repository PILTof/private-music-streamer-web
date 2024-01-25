import axiosClient from "../../../../app/axios-client";



export const ajaxGetFiles = async () => {
    let result = [];
    await axiosClient
        .get("/admin/getMusic")
        .then((res) => {
            if (res.data.length > 0) {
                result = res.data[0];
                console.log(res.data[0])
            }
        })
        .catch((err) => console.log(err));
    return result;
};
export const ajaxSetDir = async (array) =>{ 
    console.log(array)
    await axiosClient.post('/admin/setDirForSelected', array).then((res) => {
        console.log(res)
    })
}

export const ajaxDelEl = async (id) => {
    console.log(id)
    await axiosClient.post('/admin/deleteElement', [id]).then((res) => console.log(res))
    return 'deleted'+id
}