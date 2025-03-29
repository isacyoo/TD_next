import Review from '@/components/review/Review'

export default async function ReviewPage({ params, searchParams }) {
    const { eventId } = await params
    const currentSearchParams = await searchParams
    return (
        <div>
            <Review id={eventId} searchParams={currentSearchParams}></Review>
        </div>
    )
}