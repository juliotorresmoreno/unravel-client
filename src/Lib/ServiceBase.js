

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
    getJSON = (url) => {
        return new Promise((successHandler, errorHandler) => {
            var xhr = typeof XMLHttpRequest !== 'undefined'
                ? new XMLHttpRequest()
                : new window.ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('get', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        successHandler && successHandler(JSON.parse(xhr.responseText));
                    } else {
                        errorHandler && errorHandler(xhr.status);
                    }
                }
            };
            xhr.send();
        });
    };
    get = (url, data) => {
        return fetch(url, {
            method: "GET",
            credentials: 'same-origin'
        });
    }
    post = (url, data) => {
        return fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            credentials: 'same-origin',
            body: arrayToUrlEncode(data)
        });
    }
}