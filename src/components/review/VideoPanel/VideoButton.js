export default function VideoButton(props) {
    return (
            <button onClick={props.selectVideo} className='bg-primary-700 text-primary-100 inline-block text-lg px-5 py-3 font-medium rounded-2xl border-0 m-5'>{props.videoIndex+1}</button>
    )
}