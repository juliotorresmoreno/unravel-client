const server = location.host;

export default {
    api: "https://" + server + "/api/v1",
    servidorwss: "wss://" + server + "/ws",
}