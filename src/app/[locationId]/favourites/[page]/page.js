import Dashboard from "@/components/dashboard/Dashboard"

export default async function FavouritesPage(props) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    return (
        <Dashboard page={params.page} locationId={params.locationId} searchParams={searchParams} history={false} fav={true}/>
    )
}