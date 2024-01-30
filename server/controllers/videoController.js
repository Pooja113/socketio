import fs from 'fs'
import { URL } from 'url';

export const videoController = (req, res) => {
    const __filename = new URL('..', import.meta.url).pathname;
    const filePath = `${__filename}videos/sample.mp4`
    const videoSize = fs.statSync(filePath).size;
    console.log("🚀 ~ videoController ~ filePath:", videoSize)
    const range = req.headers.range;
    if (!range) {
        res.status(400).json({ message: "Requires Range header" })
    };



}