import MemberInfo from './MemberInfo'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SaveEvent from "./SaveEvent";

export default function AllMemberInfo({ location, entriesInfo, saved, eventId }) {
    if (!entriesInfo) {
        return (<></>)
    }

    return (
    <div className="border-b-2 border-b-primary/60 pb-8">
        <SaveEvent eventId={eventId} saved={saved}></SaveEvent>
        <h2 className='text-center mb-3 font-bold'>Event Metadata</h2>
        <Carousel opts={{
            loop: true
        }}>
            <CarouselContent>
                {entriesInfo.map((entry, i) => (
                    <CarouselItem key={i} index={i}>
                        <MemberInfo memberInfo={entry} location={location} ></MemberInfo>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        <Button variant="secondary" size="sm" className="mt-4">
            <Link href="/settings/members">
                View all high risk members
            </Link>
        </Button>

    </div>    
    )
}