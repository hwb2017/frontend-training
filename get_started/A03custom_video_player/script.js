// 获取元素
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// 单击屏幕时切换播放状态
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// 更新播放图标状态
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }
}

// 根据视频进度，更新进度条及时间戳信息
function updateVideoProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    let minute = Math.floor(video.currentTime / 60);
    if (minute < 10) {
        minute = `0${minute}`;
    }
    let second = Math.floor(video.currentTime % 60);
    if (second < 10) {
        second = `0${second}`;
    }
    timestamp.innerText = `${minute}:${second}`;
}

// 停止视频并回退到开头
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// 拖拽进度条时更新视频进度
function setVideoProgress() {
    video.currentTime = (+progress.value / 100)*video.duration;
}

// 添加事件监听
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateVideoProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);