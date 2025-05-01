import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SettingsH2 } from "@/components/settings/SettingsHeaders"

export default function Compliance({ videoRetention, streamRetention, setVideoRetention, setStreamRetention }) {
    if ( videoRetention === null ) {
        videoRetention = ""
    }
    if ( streamRetention === null ) {
        streamRetention = ""
    }    
    const isNumeric = (string) => /^[0-9]+$/.test(string)

    const handleVideoRetentionChange = (e) => {
        const value = e.target.value

        if (value === "") {
            setVideoRetention(value)
            return
        }

        if (isNumeric(value)) {
            const intValue = parseInt(value, 10)
            if (intValue >=0 && intValue <= 365) {
                setVideoRetention(intValue)
            }
        }
    }
    const handleStreamRetentionChange = (e) => {
        const value = e.target.value

        if (value === "") {
            setStreamRetention(value)
            return
        }
        if (isNumeric(value)) {
            const intValue = parseInt(value, 10)
            if (intValue >=0 && intValue <= 720) {
                setStreamRetention(intValue)
            }
        }
    }

    return (
        <div>
            <SettingsH2 mb={4}>Compliance</SettingsH2>
            <div className="flex items-center gap-4">
                <div>
                <Label htmlFor="video-retention" className="block mb-2">
                    Video Retention Days
                </Label>
                <Input
                    id="video-retention"
                    value={videoRetention}
                    onChange={handleVideoRetentionChange}
                    min={0}
                    max={365}
                    placeholder="Enter number of days"
                />
                </div>
                <div>
                <Label htmlFor="stream-retention" className="block mb-2">
                    Stream Retention Hours
                </Label>
                <Input
                    id="stream-retention"
                    value={streamRetention}
                    onChange={handleStreamRetentionChange}
                    min={0}
                    max={720}
                    placeholder="Enter number of hours"
                />
                </div>
            </div>
        </div>
    )
}