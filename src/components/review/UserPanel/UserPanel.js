import ActionContainer from "./ActionContainer/ActionContainer";
import AllMemberInfo from "./MemberInfo/AllMemberInfo";
import AdjacentEventNavigator from "./AdjacentEventNavigator";

export default function UserPanel({ entriesInfo, actions, currentAction, adjacentEvents, location, params, showAdjacentEvents }) {
    const history = currentAction !== null
    
    return (
        <div className="flex flex-col justify-start items-center p-5 border-primary border-2 my-0 mx-2 rounded-sm">
            <AllMemberInfo location={location} entriesInfo={entriesInfo}></AllMemberInfo>
            {actions.length === 0 ? <></> : <ActionContainer actions={actions} currentAction={currentAction?.name}></ActionContainer>}
            <AdjacentEventNavigator adjacentEvents={adjacentEvents} locationId={location.id} history={history} params={params} showAdjacentEvents={showAdjacentEvents}></AdjacentEventNavigator>
        </div>
    )
}