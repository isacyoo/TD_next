import Link from 'next/link'

function AdjacentEventNavigationButton({ eventId, children }) {
    const url = '/review-event/' + eventId
    return <Link href={url} className='py-3 px-5 bg-primary-700 border-none rounded cursor-pointer mr-1 text-primary-200'>{children}</Link>
}

export default function AdjacentEventNavigator({ adjacentEvents, locationId, history }) {
    const { previous_event, next_event } = adjacentEvents
    return (
    <div className='flex flex-col items-center'>
    <div className='mt-5 flex'>
        {previous_event===null ? <></> : <AdjacentEventNavigationButton eventId={previous_event}>Previous Video</AdjacentEventNavigationButton>}
        {next_event===null ? <></> : <AdjacentEventNavigationButton eventId={next_event}>Next Video</AdjacentEventNavigationButton>}
    </div>
        <Link href={`/${locationId}/${history ? 'history' : 'dashboard'}/1`} className='mt-5 py-3 px-5 bg-primary-700 border-none rounded cursor-pointer mr-1 text-primary-200 my-8'>Return to Dashboard</Link>
    </div>
    )
}