// Select all video elements inside the video list
let listVideo = document.querySelectorAll(".video-list .vid");

// Select the main video element and its title
let mainVideo = document.querySelector(".main-video video");
let title = document.querySelector(".main-video .title");

// Add click event listener to each video element in the list
listVideo.forEach((video) => {
  video.onclick = () => {
    // Remove 'active' class from all video elements
    listVideo.forEach((vid) => vid.classList.remove("active"));

    // Add 'active' class to the clicked video element
    video.classList.add("active");

    // Update the main video source and title with the clicked video's details
    if (video.classList.contains("active")) {
      let src = video.children[0].getAttribute("src");
      mainVideo.src = src;
      let text = video.children[1].innerHTML;
      title.innerHTML = text;
    }
  };
});

// Function to set the background GIF based on the active video
function addGifBackground(gifMap) {
  // Event listener for when the main video starts playing
  mainVideo.onplay = () => {
    // Get the active video element in the list
    const activeVideo = document.querySelector(".video-list .vid.active");
    // Get the source of the active video
    const videoSrc = activeVideo.children[0].getAttribute("src");
    // Get the corresponding GIF path from the provided mapping
    const gifPath = gifMap[videoSrc];
    // Set the body background to the GIF path
    if (gifPath) {
      document.body.style.backgroundImage = `url('${gifPath}')`;
      document.body.classList.add("show-gif-background");
    }
  };

  // Event listener for when the main video is paused
  mainVideo.onpause = () => {
    // Do not remove the background on video pause
    // The background will remain displayed even when the video is paused
    const activeVideo = document.querySelector(".video-list .vid.active");
    const videoSrc = activeVideo.children[0].getAttribute("src");
    const gifPath = gifMap[videoSrc];
    if (gifPath) {
      document.body.style.backgroundImage = `url('${gifPath}')`;
      document.body.classList.add("show-gif-background");
    }
  };

  // Add an event listener to the document to clear the background when clicking outside the video list
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".video-list")) {
      document.body.style.backgroundImage = "";
      document.body.classList.remove("show-gif-background");
    }
  });

  // Add an event listener to the video list to prevent clearing the background when clicking inside the video list
  const videoList = document.querySelector(".video-list");
  videoList.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

// Define a mapping of video sources to GIF paths
const videoToGifMap = {
  "img-vids/vid-1.mp4": "img-vids/gif-1.gif",
  "img-vids/vid-2.mp4": "img-vids/gif-2.gif",
  "img-vids/vid-8.mp4": "img-vids/gif-8.gif",
};

// Call the function with the video-to-GIF mapping
addGifBackground(videoToGifMap);
