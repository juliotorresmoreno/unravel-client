
function arrayToUrlEncode(data) {
    var r = [];
    for(var i in data)
    {
        if (data.hasOwnProperty(i))
        {
            r.push(i + '=' + encodeURI(data[i]));
        }
    }
    return r.join('&');
}


export default class ServiceBase {
    secure = (func) => {
        return func ? func: () => {};
    }
    post = (url, data) => {
        return fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: arrayToUrlEncode(data)
        });
    }
}