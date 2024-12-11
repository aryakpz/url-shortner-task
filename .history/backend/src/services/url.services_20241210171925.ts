import { URLTABLE } from "../models/url.models";

// get the url function
export async function getUrlsFromDb() {
    const urls = await URLTABLE.findAll();
    const newData = urls.map((item) => ({
        ...item.dataValues,
        link: `http://localhost:5000/api/${item.shorturl}`
    }))
    return newData;
}       

// add new url into the db             postive mind / lejo gunam
export async function addUrlToDb(url: string, length: number, shorturl: string, username: string): Promise<any> {
    const insertQuery = await URLTABLE.create({
        url,
        length,
        shorturl,
        username,
    });
    // console.log("Insert successfull:", insertQuery);
    return insertQuery;
}
 
// generating the shortkey                
export const generateShortUrl = (length: number): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result;
};

export async function deleteFromDb(shorturl: string): Promise<number> {
    console.log("Deleting record for shorturl:", shorturl);
    const deleteQuery = await URLTABLE.destroy({
        where: { shorturl: shorturl },
    });
    return deleteQuery;

}

// update the url
export async function updateFromDb(url: string, shorturl: string): Promise<any> {
    const updateQuery = await URLTABLE.update(
        { url: url },
        { where: { shorturl: shorturl } }
    );
    return updateQuery;
};

//redirecting into main url
export async function findUrlFromDb(shorturl: string): Promise<string | null> {
    const redirect = await URLTABLE.findOne({
        attributes: ['url'],
        where: { shorturl: shorturl }
    });
    return redirect ? redirect.url : null;
};

// get urls of the current user
export async function getCurrentUserUrl(username: string): Promise<any | null> {
    // console.log(username)
    const currentQuery = await URLTABLE.findAll({
        where: { username: username }
    })
    if (currentQuery.length === 0) {
        return []
    }
    return currentQuery;
};