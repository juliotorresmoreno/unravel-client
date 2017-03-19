const server = location.protocol + "//" + location.host;

export default {
    api: "http://" + server + "/api/v1",
    servidorwss: "ws://" + server + "/ws",
}