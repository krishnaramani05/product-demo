export function addValueAPI(val){
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({status: 200, data: val})
        },3000)
    })
}