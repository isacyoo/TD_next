'use client'
import VideoPlayer from "./VideoPlayer"
import VideoButtons from "./VideoButtons"
import { createRef, useState, useEffect } from "react"

export default function VideoPanel({ videoUrls }) {
    const [selectedVideo, setSelectedVideo] = useState(0)
    const videoRefs = videoUrls.map(() => createRef())

    const selectVideo = (index) => {
        const activeVideo = videoRefs[selectedVideo].current
        activeVideo.pause()
        setSelectedVideo(index)
    }

    useEffect(() => {
        const activeVideo = videoRefs[selectedVideo].current
        activeVideo.play()
    }, [selectedVideo])

    return (
        <div className="w-4/5">
            {videoUrls.map((url, i) => <VideoPlayer vidRef={videoRefs[i]} active={i==selectedVideo} url={url.url} key={i}></VideoPlayer>)}
            <VideoButtons urls={videoUrls} selectVideo={selectVideo}></VideoButtons>
        </div>
    )
}