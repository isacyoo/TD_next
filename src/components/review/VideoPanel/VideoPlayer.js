export default function VideoPlayer (props) {
    const { vidRef, active, url } = props
    return (
        <div className={active ? 'block' : 'hidden'}>
            <video className="max-w-[90%] max-h-full my-0 mx-auto rounded-md" ref={vidRef} key={url} controls controlsList="nodownload" autoPlay muted>
                <source key={url} src={url} type="video/mp4"></source>
                Your browser does not support the video tag
            </video>
        </div>
    )

}