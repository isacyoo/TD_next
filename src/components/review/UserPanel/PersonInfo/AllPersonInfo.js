'use client'
import { useState } from 'react'
import PersonInfo from './PersonInfo'

export default function AllPersonInfo({ location, entriesInfo }) {
    const [currentPerson, setCurrentPerson] = useState(0)

    if (!entriesInfo) {
        return (<></>)
    }
    return (
    <div className='flex flex-col h-1/3 items-center border-b-2 border-b-primary-600'>
        <h2 className='text-center mb-3 font-bold'>Event Metadata</h2>
        <PersonInfo personInfo={entriesInfo[currentPerson]} location={location} ></PersonInfo>
        <PersonInfoNavigator totalPersons={entriesInfo.length} currentPerson={currentPerson} setCurrentPerson={setCurrentPerson}></PersonInfoNavigator>
    </div>
    )
}

function PersonInfoNavigator({ totalPersons, currentPerson, setCurrentPerson }) {
    return (
    <div className="my-4">
        { currentPerson != 0 ? <button className="py-2 px-3 bg-primary-600 border-none cursor-pointer mr-2 rounded-md text-primary-200" onClick={() => setCurrentPerson(currentPerson-1)}>{"<-"}</button>: "" }
        { currentPerson < totalPersons - 1 ? <button className="py-2 px-3 bg-primary-600 border-none cursor-pointer mr-2 rounded-md text-primary-200" onClick={() => setCurrentPerson(currentPerson+1)}>{"->"}</button>: "" }
    </div>
    )
}