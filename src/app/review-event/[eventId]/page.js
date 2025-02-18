import Review from '@/components/review/Review'

export default async function ReviewPage({ params, searchParams }) {
    const { eventId } = await params
    return (
        <div>
            <Review id={eventId}></Review>
        </div>
    )
}