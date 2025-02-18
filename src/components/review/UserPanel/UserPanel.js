import ActionContainer from "./ActionContainer/ActionContainer";
import AllPersonInfo from "./PersonInfo/AllPersonInfo";
import AdjacentEventNavigator from "./AdjacentEventNavigator";

export default function UserPanel({ entriesInfo, actions, currentAction, adjacentEvents, location }) {
    const history = currentAction !== null
    
    return (
        <div className="flex w-1/5 flex-col justify-start items-center p-5 border-primary-400 border-2 my-0 mx-2 rounded-sm">
            <AllPersonInfo location={location} entriesInfo={entriesInfo}></AllPersonInfo>
            {actions.length === 0 ? <></> : <ActionContainer actions={actions} currentAction={currentAction?.name}></ActionContainer>}
            <AdjacentEventNavigator adjacentEvents={adjacentEvents} locationId={location.id} history={history} ></AdjacentEventNavigator>
        </div>
    )
}