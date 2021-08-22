import useAxios from "./useAxios";

export function getHomeMultidata() {
    return useAxios({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return useAxios({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}