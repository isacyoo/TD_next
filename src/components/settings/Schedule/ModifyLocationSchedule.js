"use client"

import { useEffect, useState } from 'react'
import Modal from "@/components/common/Modal"
import { post } from "@/util/clientApi"


export default function WeekSchedule({ locationId, schedule }) {
	const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
		"12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
	]
    const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
    const dow = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'pub']
    const dowNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Public Holiday']

	const [ selectedHour, setSelectedHour ] = useState("00")
    const [ selectedMinute, setSelectedMinute ] = useState("00")
	const [ duration, setDuration ] = useState("")
    const [ currentSchedule, setCurrentSchedule ] = useState(schedule)
    const [ showModal, setShowModal ] = useState(false)
	const [ modalConfirmFunction, setModalConfirmFunction ] = useState(() => () => {})
	const [ invalidMessage, setInvalidMessage ] = useState("")

	const setDaySchedule = (day, newSchedule) => {
		setCurrentSchedule({...currentSchedule, [day]: newSchedule})
	}

	const checkScheduleValidity = (newSchedule) => {
		post("/validate_schedule", newSchedule).then(
			(res) => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error(res.status)
				}
			}
		).then(
			(data) => {
				if (!data.input_valid) {
					setInvalidMessage("Invalid input in the schedule")
				} else if (!data.valid) {
					setInvalidMessage("Invalid schedule")
				} else {
					setInvalidMessage("")
				}
			}
		)
	}

	const onSubmit = () => {
		if (invalidMessage !== "") {
			alert("Invalid schedule. Please correct the schedule before saving.")
			return
		}
		post(`/schedule/${locationId}`, currentSchedule).then(
			(res) => {
				if (res.ok) {
					alert("Schedule saved successfully")
				} else if (res.status == 401 || res.status == 403 || res.status == 422) {
					throw new Error(res.status)
				} else {
					alert("Failed to save schedule. Please try again.")
				}
			}
		)
	}
	
	useEffect(() => {
		checkScheduleValidity(currentSchedule)
	}
	, [currentSchedule])
    
    return (
        <div>
            <div>
                {dow.map((day, index) => (
                    <DaySchedule key={index} dow={dowNames[index]} daySchedule={currentSchedule[day]}
					setDaySchedule={(newSchedule) => setDaySchedule(day, newSchedule)}
					setModalConfirmFunction={setModalConfirmFunction} setShowModal={setShowModal}
					setSelectedHour={setSelectedHour} setSelectedMinute={setSelectedMinute} setDuration={setDuration}/>
                ))}
            </div>
            {showModal ? <Modal title="Edit runs" setShowModal={setShowModal}>
				<ModalContent closeModal={() => setShowModal(false)} onConfirm={modalConfirmFunction} selectedHour={selectedHour}
					selectedMinute={selectedMinute} duration={duration} setSelectedHour={setSelectedHour} setSelectedMinute={setSelectedMinute}
					setDuration={setDuration} hours={hours} minutes={minutes}/>
			</Modal> : <></>}
			<div>{invalidMessage}</div>
			<button onClick={onSubmit}>Save</button>
        </div>
    )
}

function DaySchedule({ dow, daySchedule, setDaySchedule, setModalConfirmFunction, setShowModal, setSelectedHour, setSelectedMinute, setDuration }) {
	const resetModal = () => {
		setSelectedHour("00")
		setSelectedMinute("00")
		setDuration("")
		setShowModal(false)
	}
	const addRun = (time, duration) => {
		const newRun = { start_time: time, duration }
		console.log([...daySchedule, newRun])
		setDaySchedule([...daySchedule, newRun])
		resetModal()
	}

	const updateRun = (index, time, duration) => {
		const newRun = { start_time: time, duration }
		setDaySchedule(daySchedule.map((run, i) => i === index ? newRun : run))
		resetModal()
	}

	const removeRun = (index) => {
		setDaySchedule(daySchedule.filter((run, i) => i !== index))
	}

    return (
        <div>
            <h3>{dow}</h3>
            <div>
                {daySchedule.map((run, index) => {
                    return <SingleRun key={index} run={run} updateRun={() => {
						setModalConfirmFunction(() => (hour, minute, duration) => updateRun(index, `${hour}:${minute}`, parseFloat(duration)))
						setSelectedHour(run.start_time.split(":")[0])
						setSelectedMinute(run.start_time.split(":")[1])
						setDuration(run.duration)
						setShowModal(true)
					}} removeRun={() => removeRun(index)} />
				})}
            </div>
			<button onClick={() => {
				setModalConfirmFunction(() => (hour, minute, duration) => addRun(`${hour}:${minute}`, parseFloat(duration)))
				setShowModal(true)
			}
			}>Add run</button>

        </div>
    )
}

function SingleRun({ run, updateRun, removeRun }) {
    return (
        <div>
            <p>{run.start_time}</p>
            <p>{run.duration}</p>
            <button onClick={updateRun}>Update</button>
            <button onClick={removeRun}>×</button>
        </div>
    )
}


function ModalContent({ closeModal, onConfirm, hours, minutes, selectedHour, selectedMinute, duration, setSelectedHour, setSelectedMinute, setDuration }) {
	const handleDurationInputChange = (e) => {
		const value = e.target.value
		if (value === '' || (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 24)) {
			setDuration(value)
		}
	}

	const validateInputAndConfirm = (hour, minute, duration) => {
		if (duration === '') {
			alert("Duration cannot be empty")
		}
		else {
			onConfirm(hour, minute, duration)
		}
	}

    return (
        <>
			<div className="relative p-6 flex-auto">
				<label>
					Hour:
					<select
						value={selectedHour}
						onChange={(e) => setSelectedHour(e.target.value)}
					>
						{hours.map((hour) => (
							<option key={hour} value={hour}>{hour}</option>
						))}
					</select>
				</label>
				<label>
					Minute:
					<select
						value={selectedMinute}
						onChange={(e) => setSelectedMinute(e.target.value)}
					>
						{minutes.map((minute) => (
							<option key={minute} value={minute}>{minute}</option>
						))}
					</select>
				</label>
				<label>
					Duration:
					<input
						type="text"
						value={duration}
						onChange={handleDurationInputChange}
						placeholder="Duration in hours"
					/>
				</label>
          	</div>
          	<div className="flex items-center justify-end p-6 border-t border-solid border-primary-200 rounded-b">
            	<button
					className="text-primary-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
					type="button"
					onClick={closeModal}
            	>
              		Close
            	</button>
            	<button
              		className="bg-primary-600 text-primary-100 active:bg-primary-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-primary-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
					type="button"
					onClick={() => validateInputAndConfirm(selectedHour, selectedMinute, duration)}
				>
              		Apply
				</button>
			</div>
        </>
      )
}