import fs from 'fs'
import { URL } from 'url';

export const videoController = (req, res) => {
    const range = req.headers.range;
    console.log("🚀 ~ videoController ~ range:", range)
    if (!range) {
        res.status(400).json({ message: "Requires Range header" })
    };
    const __filename = new URL('..', import.meta.url).pathname;
    const filePath = `${__filename}videos/sample.mp4`
    const videoSize = fs.statSync(filePath).size;
    const CHUNK_SIZE = 10 ** 4;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1
    console.log("🚀 ~ videoController ~ contentLength:", contentLength)
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(filePath, { start, end });
    videoStream.pipe(res);

}