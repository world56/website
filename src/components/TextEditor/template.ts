const template = {
  getVideo(url: string) {
    return `<div class='player-media' contenteditable="false"><media-controller class="player-video" style="width:60%;" gesturesdisabled><video slot="media" src="${url}"></video><div slot="centered-chrome" style="border-radius: 50%;overflow: hidden;"><media-play-button></media-play-button></div><media-control-bar><media-play-button></media-play-button><media-time-range></media-time-range><media-time-display></media-time-display><media-mute-button></media-mute-button><media-volume-range></media-volume-range><media-fullscreen-button></media-fullscreen-button></media-control-bar></media-controller></div>`;
  },
  getImage(url: string) {
    return `<img src='${url}' alt='#' style='width:max-content;' />`;
  },
  getAudio: (url: string) => {
    return `<div class='player-media' contenteditable="false"><media-controller class='player-audio' style="width:50%;" audio><audio slot="media" src="${url}"></audio><media-control-bar><media-play-button notooltip></media-play-button><media-time-display show-duration></media-time-display><media-time-range></media-time-range><media-playback-rate-button></media-playback-rate-button><media-mute-button></media-mute-button><media-volume-range></media-volume-range></media-control-bar></media-controller></div>`;
  },
  getTitle: () => {
    return `<span class='main-title'>标题</span> `;
  },
};

export default template;
