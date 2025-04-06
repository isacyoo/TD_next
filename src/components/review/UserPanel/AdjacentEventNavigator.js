import Link from 'next/link'
import { Button } from "@/components/ui/button"


function AdjacentEventNavigationButton({ eventId, params, text }) {
    const url = `/review-event/${eventId}?${params}`
    return (
        <Link href={url}>
            <Button variant="secondary">{text}</Button>
        </Link>
    )
}

export default function AdjacentEventNavigator({ adjacentEvents, locationId, history, params, showAdjacentEvents }) {
    const { previous_event, next_event } = adjacentEvents
    return (
    <div className='flex flex-col items-center'>
    {showAdjacentEvents ? 
        <div className='mt-5 flex gap-2'>
            {previous_event===null ? <></> : <AdjacentEventNavigationButton eventId={previous_event} params={params} text="Previous Video"/>}
            {next_event===null ? <></> : <AdjacentEventNavigationButton eventId={next_event} params={params} text="Next Video"/>}
        </div>
        : <></>}
        <Link href={`/${locationId}/${history ? 'history' : 'dashboard'}/1?${params}`}>
            <Button className="mt-6">
                Return to Dashboard
            </Button>
        </Link>
    </div>
    )
}