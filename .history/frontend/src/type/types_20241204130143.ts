export type urlProps = {
    id: number,
    url: string,
    length: number,
    key: string,
    shorturl: string,
    link:string

}

export type CopyProps = {
    shorturl: string;
    handleCopy: (text: string) => void
}

export type BackendResponse = {
    message: string;
    success: boolean;
    data: urlProps[];
}

export type DeleteProps = {
    shorturl: string;
};

export type postProps={
    url:string;
    length:number
}

export type editPros={
    item:urlProps;
    index:number
}

export type formProps={
    name:string,
    username:string,
    password:string
}[]

// Office@6378#