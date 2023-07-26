// 검색 함수
// 1. 검색 단어 가져오기
// 2. 단어 조건에 맞는 영상 항목을 relatedVideos에 넣기
// 3. 메인 화면 비디오 리스트들 display:none
// 4. relatedVideos에 있는 영상 항목을 generateVideoHTML 함수를 통해 display
async function searchVideos() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    const mainContainer = document.getElementById('mainContainer');
    const videoList = await getVideoList();
    let relatedVideos = [];

    videoList.forEach(video => {
        const { video_title, video_detail, video_tag } = video;

        if (video_title.toLowerCase().includes(searchInput) || 
            video_detail.toLowerCase().includes(searchInput) || 
            video_tag.some(tag => tag.toLowerCase().includes(searchInput))) {
            relatedVideos.push(video);
        }
    });
    
    mainContainer.style.display = 'none';
    searchResults.innerHTML = '';

    for (let video of relatedVideos) {
        let videoInfo = await getVideoInfo(video.video_id);
        const infoHTML = generateVideoHTML(videoInfo);
        searchResults.innerHTML += infoHTML;
    }
    searchResults.style.display = 'block';
}

// VideoList Data Pull 함수
async function getVideoList() {
    const response = await fetch('http://oreumi.appspot.com/video/getVideoList');
    const VideoListData = await response.json();
    return VideoListData;
}

// VideoInfo Data Pull 함수
async function getVideoInfo(videoId) {
    const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
    const response = await fetch(apiUrl);
    const VideoInfoData = await response.json();
    return VideoInfoData;
}

// videoInfo에 맞는 HTML 구조 구성 함수
function generateVideoHTML(videoInfo) {
    return `
        <div class="thumbnail">
            <img src="${videoInfo.image_link}" style="width:320px;cursor:pointer;"/>
            <div style="display:flex;">
                <div style="width:30px; height: 30px; border-radius: 50%; overflow:hidden;">
                </div>
                <div style="margin-left: 10px;">
                    <p>${videoInfo.video_title}</p>
                    <p>${videoInfo.video_channel}</p>
                    <p>${videoInfo.views} views</p>
                    <p>${videoInfo.upload_date}</p>
                </div>
            </div>
        </div>
    `;
}

// 화면에 띄워주는 함수
async function displayHome() {
    const videoList = await getVideoList();
    const infoContainer = document.getElementById('videoList');

    for (let video of videoList) {
        const videoInfo = await getVideoInfo(video.video_id);

        const infoHTML = generateVideoHTML(videoInfo);

        infoContainer.innerHTML += infoHTML;
    }
}

// 오류 시 안내
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await displayHome();
    } catch (error) {
        console.error('Error:', error);
    }
});


// import { XMLHttpRequest } from "xmlhttprequest";

// class VideoInfo {
//     constructor(videoId) {
//         this.videoId = videoId;
//     }

//     loadVideoInfo() {
//         let obj = this;
//         let xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === xhr.DONE) {
//                 if (xhr.status === 200) {
//                     let data = JSON.parse(xhr.responseText);
//                     if (data.Response === 'False') {
//                         console.log('Fail to fetch video info. Response is \'False\'');
//                     } else {
//                         console.log('Success to fetch video info.');
//                         obj.imageLink = data.image_link;
//                         obj.uploadDate = data.upload_date;
//                         obj.videoChannel = data.video_channel;
//                         obj.videoDetail = data.video_detail;
//                         obj.videoLink = data.video_link;
//                         obj.videoTag = data.video_tag;
//                         obj.videoTitle = data.video_title;
//                         obj.views = data.views;
//                     }
//                 } else {
//                     console.log('Fail to fetch video info.');
//                 }
//             }
//         };
//         xhr.open('GET', 'https://oreumi.appspot.com/video/getVideoInfo?video_id=' + this.videoId, true);
//         xhr.send();
//     }

//     showVideoInfo() {
//         console.log(this.imageLink);
//         console.log(this.uploadDate);
//         console.log(this.videoChannel);
//         console.log(this.videoDetail);
//         console.log(this.videoLink);
//         console.log(this.videoTag);
//         console.log(this.videoTitle);
//         console.log(this.views);
//     }
// }

// /* Test code */
// // let vi = new VideoInfo(0);
// // vi.loadVideoInfo();
// // setTimeout(() => {
// //     vi.showVideoInfo();
// // }, "5000");

// export default VideoInfo;