export default function VideoPlayer (props) {
    const { vidRef, active, url } = props
    return (
        <div className={active ? 'block' : 'hidden'}>
            <video className="rounded-md border-4 border-primary" ref={vidRef} key={url} controls controlsList="nodownload" autoPlay muted height={720} width={1280}>
                <source key={url} src={url} type="video/mp4"></source>
                Your browser does not support the video tag
            </video>
        </div>
    )

}