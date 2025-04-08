import { Skeleton } from "@/components/ui/skeleton"
import { SettingsH1 } from "@/components/settings/SettingsHeaders"

export default function ScheduleSkeleton() {
    return (
        <div>
            <SettingsH1>Manage Schedule</SettingsH1>
            <div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col">
                    <Skeleton className="w-[308px] h-[120px] mx-8 mt-8" />
                </div>
            ))}
                
            </div>
        </div>
    )
}