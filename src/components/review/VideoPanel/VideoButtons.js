import VideoButton from './VideoButton.js';

export default function VideoButtons(props) {
    const { urls, selectVideo } = props;
    return (
        <div className='flex justify-center'>
            {urls.map((_, index) => <VideoButton videoIndex={index} key={index} selectVideo={() => selectVideo(index)}></VideoButton>)}
        </div>
    )
}