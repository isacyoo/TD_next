import Card from "./Card"

export default function Gallery({ totalUnreviewed, locationStats }) {
    return (
        <>
        <div className="flex justify-between items-center my-6">
            <h1 className="text-2xl font-bold">All locations</h1>
            <p className="text-sm text-gray-500">Total Unreviewed: {totalUnreviewed}</p>
        </div>
        <div className="container grid m-auto sm: grid-cols-1 md:grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
            {locationStats.map((locationStat, i) => <Card locationStat={locationStat} key={i}></Card>)}
        </div>
        </>
        )
}