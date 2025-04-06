import Review from '@/components/review/Review'

export default async function ReviewPage({ params, searchParams }) {
    const { eventId } = await params
    const currentSearchParams = await searchParams
    const showAdjacentEvents = currentSearchParams.showAdjacentEvents != 'true'
    delete currentSearchParams.showAdjacentEvents
    return (
        <div>
            <Review id={eventId} searchParams={currentSearchParams} showAdjacentEvents={showAdjacentEvents}></Review>
        </div>
    )
}