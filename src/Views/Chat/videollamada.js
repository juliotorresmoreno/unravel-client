import React from 'react';
import VideoLLamadaCtrl from './videollamada.ctrl';
const SimpleWebRTC = window.SimpleWebRTC;
var webrtc;

export default class VideoLLamada extends VideoLLamadaCtrl {
    componentDidMount = () => {
        const usuario = this.props.store.getState().usuario;
        const session = this.props.store.getState().session;
        var room;
        if (session.usuario > usuario.usuario) {
            room = "room_" + session.usuario + "_" + usuario.usuario;
        } else {
            room = "room_" + usuario.usuario + "_" + session.usuario;
        }
        if (typeof webrtc === "undefined") {
            webrtc = new SimpleWebRTC({
                localVideoEl: 'localVideo',
                remoteVideosEl: 'remoteVideos',
                autoRequestMedia: true,
                media: {
                    video: true,
                    audio: false
                },
            });
            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(room);
            });
            return;
        }
        webrtc.joinRoom(room);
    }
    render = () => {
        return (
            <div>
                <div id="remoteVideos"></div>
            </div>
        )
    }
}

//<video id="localVideo" controls></video>