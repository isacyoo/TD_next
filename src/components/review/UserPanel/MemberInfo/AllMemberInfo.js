import MemberInfo from './MemberInfo'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

export default function AllMemberInfo({ location, entriesInfo }) {
    if (!entriesInfo) {
        return (<></>)
    }

    return (
    <div className="border-b-2 border-b-primary/60 pb-8">
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
    </div>    
    )
}