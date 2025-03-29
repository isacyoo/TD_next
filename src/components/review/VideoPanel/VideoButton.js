import { Button } from "@/components/ui/button"

export default function VideoButton({ selected, selectVideo, videoIndex}) {
    return (
            <Button onClick={selectVideo} variant={selected ? "default" : "secondary"} size="lg" className={"text-lg px-5 py-6 font-medium rounded-2xl border-0 m-5"}>{videoIndex+1}</Button>
    )
}