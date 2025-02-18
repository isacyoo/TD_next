import Link from 'next/link'
import LocationStat from './LocationStat'

export default function Card({ locationStat }) {
    const { location, stats } = locationStat
    return (
        <div className="flex flex-col bg-primary-200 rounded-3xl w-56 h-60 justify-start">
            <div>
                <h2 className="py-2 text-xl font-bold text-center">{location.name}</h2>
            </div>
            <div className='flex justify-between'>
                <Link href={`/${location.id}/dashboard/1`} className="flex w-full mx-4 my-3 py-1 border-b-primary-400 border-b-2 justify-center text-primary-600 items-center text-md hover:bg-primary-300 duration-300">Dashboard</Link>
                <Link href={`/${location.id}/history/1`} className="flex w-full mx-4 my-3 py-1 border-b-primary-400 border-b-2 justify-center text-primary-600 items-center text-md hover:bg-primary-300 duration-300">History</Link>
            </div>
            <div>
                <LocationStat stats={stats}></LocationStat>
            </div>
            
        </div>
    )
}