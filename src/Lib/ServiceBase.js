

export default class ServiceBase {
    secure = (func) => {
        return typeof func === "function" ? func: () => {};
    }
    get = (url) => {
        return fetch(url, {
            method: "GET",
            credentials: 'include', 
            mode: 'cors' 
        });
    }
    post = (url, data, headers = {}) => {
        return fetch(url, {
            method: "POST",
            headers: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, headers),
            credentials: 'include', 
            mode: 'cors',
            body: this.arrayToUrlEncode(data)
        });
    }
    upload = (url, data, headers = {}) => {
        return fetch(url, {
            method: "POST",
            credentials: 'include', 
            mode: 'cors',
            body: data
        });
    }
    put = (url, data, headers = {}) => {
        return fetch(url, {
            method: "POST",
            headers: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, headers),
            credentials: 'include', 
            mode: 'cors',
            body: this.arrayToUrlEncode(data)
        });
    }
    delete = (url, data, headers = {}) => {
        return fetch(url, {
            method: "POST",
            headers: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, headers),
            credentials: 'include', 
            mode: 'cors',
            body: this.arrayToUrlEncode(data)
        });
    }
    arrayToUrlEncode = (data) => {
        var r = [];
        for(var i in data)
            if (data.hasOwnProperty(i))
                r.push(i + '=' + encodeURI(data[i]));
        return r.join('&');
    }
}