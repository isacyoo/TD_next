import VideoButton from './VideoButton.js';

export default function VideoButtons({ urls, selectedVideo, selectVideo}) {
    return (
        <div className='flex justify-center'>
            {urls.map((_, index) => <VideoButton selected={selectedVideo==index} videoIndex={index} key={index} selectVideo={() => selectVideo(index)}></VideoButton>)}
        </div>
    )
}