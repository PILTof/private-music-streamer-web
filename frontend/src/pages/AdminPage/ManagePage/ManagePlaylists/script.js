import axiosClient from "../../../../app/axios-client";

export const ajaxGetPlaylists = async () => {
    let result = [];
    await axiosClient.get('/admin/getPlaylists').then(res => result = res.data).catch(err => console.log(err.response.data.message))
    return result;
};
export const ajaxAddPlyalist = async (payload) => {
    let result = [];
    await axiosClient.post('/admin/addPlaylist', payload).then((res) => result = res).catch((err) => console.log(err.response.data.message))
    return result;
}

export const ajaxGetPlaylist = async (tracks) => {
    let result = [];
    await axiosClient.post('/admin/getPlaylist', tracks).then(res => {result = res})
    return result;
}