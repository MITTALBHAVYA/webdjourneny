const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const fs = require('fs');

// Function to download a video given its URL and save path
async function downloadVideo(videoUrl, savePath) {
    return new Promise((resolve, reject) => {
        const videoStream = ytdl(videoUrl, { quality: 'highest' });
        const fileStream = fs.createWriteStream(savePath);
        
        videoStream.pipe(fileStream);
        
        videoStream.on('error', (error) => {
            reject(error);
        });
        
        fileStream.on('finish', () => {
            resolve();
        });
    });
}

// Function to download all videos in a playlist
async function downloadPlaylist(playlistUrl) {
    const playlist = await ytpl(playlistUrl);
    const videos = playlist.items;
    
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoUrl = video.url;
        const videoTitle = video.title.replace(/[^\w\s]/gi, ''); // Remove special characters from title
        const savePath = `E:/studyMaterial/${videoTitle}.mp4`; // Modify save path as needed
        console.log(`Downloading video: ${videoTitle}`);
        await downloadVideo(videoUrl, savePath);
        console.log(`Downloaded video: ${videoTitle}`);
    }
}

// Prompt user to enter playlist URL
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter the URL of the playlist: ", async (playlistUrl) => {
    console.log(`Downloading playlist from URL: ${playlistUrl}`);
    await downloadPlaylist(playlistUrl);
    console.log("Download completed!");
    readline.close();
});
