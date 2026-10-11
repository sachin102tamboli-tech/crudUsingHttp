

export interface Ipost {
    userId : string,
    id : string,
    title : string,
    content : string
}

export interface IpostRes {
    [key : string] : Ipost
}

export interface respons {
    name : string
}