import { Skeleton } from "@/components/ui/skeleton"

export default function ScheduleSkeleton() {
    return (
        <div>
            <h1 className="font-extrabold text-2xl">Locations</h1>
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