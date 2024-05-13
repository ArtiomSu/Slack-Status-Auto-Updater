const fs = require('fs');

const readFile = async () => {
    const filePath = './curl.txt';
    return new Promise((resolve, reject) => {
        // Read file asynchronously
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                reject(err);
            }
            resolve(data);
        });
    });
}

const parse = async () => {
    let file;
    try{
        file = await readFile();
    }catch(e){}
    if(!file || file.length < 50){
        throw new Error('invalid curl.txt file');
    }

    const response = {
        url: '',
        token: '',
        cookie: '',
    }
    const url = file.split(' ')[1];
    if(!url || !url.includes("slack.com")){
        throw new Error('invalid curl.txt file url does not have slack.com');
    }
    response.url = url.slice(1, -1);

    let cookie = file.split(`-H 'Cookie: `)[1];
    if(!cookie){
        throw new Error('invalid curl.txt file no cookie found');
    }
    cookie = cookie.split(`' -H '`)[0];
    response.cookie = cookie;

    let token = file.split(`name="token"`)[1];
    if(!token){
        throw new Error('invalid curl.txt file no token found');
    }
    token = token.split('\\')[4];
    if(!token){
        throw new Error('invalid curl.txt file token is impropper');
    }

    response.token = token.slice(1);

    return response;
}

module.exports = {
    parse: parse,

} 