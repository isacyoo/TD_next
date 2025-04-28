import Link from 'next/link'
import LocationStat from './LocationStat'

export default function Card({ locationStat }) {
    const { location, stats } = locationStat
    return (
        <div className="flex flex-col border-2 border-secondary shadow-sm hover:shadow-lg transition-shadow rounded-3xl w-56 h-60 justify-start">
            <div>
                <h2 className="py-3 text-xl font-bold text-center">{location.name}</h2>
            </div>
            <div className='flex justify-between'>
                <Link href={`/${location.id}/dashboard/1`} className="flex w-full mx-4 my-2 p-1 hover:rounded-sm border-b-primary/20 border-b-2 justify-center text-primary items-center text-md hover:bg-secondary duration-300">Dashboard</Link>
                <Link href={`/${location.id}/history/1`} className="flex w-full mx-4 my-2 p-1 hover:rounded-sm border-b-primary/20 border-b-2 justify-center text-primary items-center text-md hover:bg-secondary duration-300">History</Link>
            </div>
            <div>
                <LocationStat stats={stats}></LocationStat>
            </div>
            
        </div>
    )
}