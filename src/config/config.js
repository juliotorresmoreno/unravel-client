const server = location.host;

export default {
    api: "http://" + server + "/api/v1",
    servidorwss: "ws://" + server + "/ws",
}