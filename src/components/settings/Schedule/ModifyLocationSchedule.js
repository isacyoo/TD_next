"use client"

import { useEffect, useState } from 'react'
import { clientFetch } from "@/util/clientApi"

import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"  
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const intToTime = (time) => {
	return time.toString().padStart(2, '0')
}

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
	const [ scheduleValid, setScheduleValid ] = useState(true)
	const [ loading, setLoading ] = useState(false)

	const setDaySchedule = (day, newSchedule) => {
		setCurrentSchedule({...currentSchedule, [day]: newSchedule})
	}

	const checkScheduleValidity = (newSchedule) => {
		clientFetch('POST', "/validate-schedule", newSchedule).then(
			(res) => {
				if (res.ok) {
					return res.json()
				}
			}
		).then(
			(data) => {
				if (!data.input_valid) {
					toast.error("Invalid input in the schedule")
					setScheduleValid(false)
				} else if (!data.valid) {
					toast.error("Invalid schedule")
					setScheduleValid(false)
				} else {
					setScheduleValid(true)
				}
			}
		)
	}

	const onSubmit = () => {
		if (!scheduleValid) {
			toast.error("Schedule is not valid")
			return
		}
		clientFetch('PUT', `/schedule/${locationId}`, currentSchedule, setLoading).then(
			(res) => {

				if (res.ok) {
					toast.success("Schedule saved successfully")
				} else {
					toast.error("Failed to save schedule. Please try again.")
				}
			}
		)
	}
	
	useEffect(() => {
		checkScheduleValidity(currentSchedule)
	}
	, [currentSchedule])

	useEffect(() => {
		if (!showModal) {
			setSelectedHour("00")
			setSelectedMinute("00")
			setDuration("")
		}
	}, [showModal]
	)
    
    return (
        <div>
            <div className="container grid sm:grid-cols-1 md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-6">
                {dow.map((day, index) => (
                    <DaySchedule key={index} dow={dowNames[index]} daySchedule={currentSchedule[day]}
					setDaySchedule={(newSchedule) => setDaySchedule(day, newSchedule)}
					setModalConfirmFunction={setModalConfirmFunction} setShowModal={setShowModal}
					setSelectedHour={setSelectedHour} setSelectedMinute={setSelectedMinute} setDuration={setDuration}/>
                ))}
            </div>
			<Dialog open={showModal} onOpenChange={setShowModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Modify run</DialogTitle>
						<DialogDescription>
							Select the hour, minute and duration of the run
						</DialogDescription>
					</DialogHeader>
					<ModalContent closeModal={() => setShowModal(false)} selectedHour={selectedHour}
						selectedMinute={selectedMinute} duration={duration} setSelectedHour={setSelectedHour} setSelectedMinute={setSelectedMinute}
						setDuration={setDuration} hours={hours} minutes={minutes}/>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
								Close
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="button" onClick={() => {
								if (duration == '') {
									toast("Duration cannot be empty")
									return
								}
								modalConfirmFunction(selectedHour, selectedMinute, duration)
								setShowModal(false)
							}
							}>
								Apply
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Button onClick={onSubmit} disabled={loading}>Save</Button>
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
	const addRun = (startHour, startMinute, duration) => {
		const newRun = { start_hour: startHour, start_minute: startMinute, duration }
		console.log([...daySchedule, newRun])
		setDaySchedule([...daySchedule, newRun])
		resetModal()
	}

	const updateRun = (index, startHour, startMinute, duration) => {
		const newRun = { start_hour: startHour, start_minute: startMinute, duration }
		setDaySchedule(daySchedule.map((run, i) => i === index ? newRun : run))
		resetModal()
	}

	const removeRun = (index) => {
		setDaySchedule(daySchedule.filter((run, i) => i !== index))
	}

    return (
        <div className="border border-solid border-neutral/100 rounded p-4 mb-4">
			<div className="flex justify-between items-center mb-4">
				<h3>{dow}</h3>
				<Button variant="outline" className="ml-4" onClick={() => {
					setModalConfirmFunction(() => (hour, minute, duration) => addRun(parseInt(hour), parseInt(minute), parseFloat(duration)))
					setShowModal(true)
				}
				}>Add run</Button>
			</div>
            <div>
                {daySchedule.map((run, index) => {
                    return <SingleRun key={index} run={run} updateRun={() => {
						setModalConfirmFunction(() => (hour, minute, duration) => updateRun(index, `${hour}:${minute}`, parseFloat(duration)))
						setSelectedHour(intToTime(run.start_hour))
						setSelectedMinute(intToTime(run.start_minute))
						setDuration(run.duration)
						setShowModal(true)
					}} removeRun={() => removeRun(index)} />
				})}
            </div>


        </div>
    )
}

function SingleRun({ run, updateRun, removeRun }) {
    return (
        <div className='border border-solid border-neutral/100 rounded p-4 mb-4'>
			<div className="flex justify-between items-center">
				<p><b>Start time: </b>{`${intToTime(run.start_hour)}:${intToTime(run.start_minute)}`}</p>
				<Button variant="outline" size="icon" className="w-6 h-6 p-0 text-xs" onClick={removeRun}>×</Button>	
			</div>
            <p className="my-2"><b>Duration: </b>{run.duration}</p>
			<Button variant="secondary" onClick={updateRun}>Update</Button>
        </div>
    )
}


function ModalContent({ hours, minutes, selectedHour, selectedMinute, duration, setSelectedHour, setSelectedMinute, setDuration }) {
	const handleDurationInputChange = (e) => {
		let value = e.target.value
		if (value.length > 5) {
			return
		}

		if (value.endsWith('.')) {
			if (!value.includes('.')) {
				value = value.slice(0, -1)
			}
		}

		if (value === '' || (!isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 24)) {
			setDuration(e.target.value)
		}
	}

    return (
        <>
			<div className="relative p-6">
				<div className="flex justify-between items-center my-2">
					<h3>Select hour</h3>
					<div className="w-24">
						<Select value={selectedHour} onValueChange={setSelectedHour}>
							<SelectTrigger>
								<SelectValue placeholder="Hours"></SelectValue>
							</SelectTrigger>
							<SelectContent>
								{hours.map((hour) => (
									<SelectItem key={hour} value={hour}>{hour}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex justify-between items-center my-2">
					<h3>Select minute</h3>
					<div className="w-24">			
						<Select value={selectedMinute} onValueChange={setSelectedMinute}>
							<SelectTrigger>
								<SelectValue placeholder="Minutes"></SelectValue>
							</SelectTrigger>
							<SelectContent>
								{minutes.map((minute) => (
									<SelectItem key={minute} value={minute}>{minute}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex justify-between items-center my-2">
					<h3>Duration</h3>
					<Input className="mx-2" value={duration} onChange={handleDurationInputChange}></Input>
				</div>
          	</div>
        </>
      )
}