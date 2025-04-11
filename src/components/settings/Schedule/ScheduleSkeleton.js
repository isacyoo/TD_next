import { Skeleton } from "@/components/ui/skeleton"
import { SettingsH1 } from "@/components/settings/SettingsHeaders"

export default function ScheduleSkeleton() {
    return (
        <div>
            <SettingsH1>Manage Schedule</SettingsH1>
            <div>
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-[420px] h-[120px] my-8" />
            ))}
                
            </div>
        </div>
    )
}