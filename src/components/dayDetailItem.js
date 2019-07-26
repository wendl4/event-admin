import React, { useState } from 'react'
import deleteIcon from '../assets/images/deleteicon.png'
import editIcon from '../assets/images/editicon.png'
import { withFirebase } from './firebase'

function DayDetailItem(props) {

    const [edit, setEdit] = useState([false])
    const [name, setName] = useState(props.event.name)
    const [date, setDate] = useState(formatForInput(props.event.date))
    const [time, setTime] = useState(props.event.time)
    const [note, setNote] = useState(props.event.note)

    const handleChangeName = event => setName(event.target.value)
    const handleChangeDate = event => setDate(event.target.value)
    const handleChangeTime = event => setTime(event.target.value)
    const handleChangeNote = event => setNote(event.target.value)

    function handleEdit() {
        setEdit(true)
    }

    function formatForInput(inputDate) {
        let dateArray = inputDate.split("/")
        if (dateArray[0].length === 1) dateArray[0] = `0${dateArray[0]}`
        if (dateArray[1].length === 1) dateArray[1] = `0${dateArray[1]}`
        return (`${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`)
    }

    function formatForDb(inputDate) {
        let formatedDate = inputDate.split("-")
        return `${parseInt(formatedDate[1])}/${parseInt(formatedDate[2])}/${formatedDate[0]}`
    }

    function handleDelete() {
        props.firebase.event(props.event.id).remove()
    }

    function handleSubmit(e) {
        e.preventDefault()
        let formatedDate = formatForDb(date)

        props.firebase.event(props.event.id).update({
              name: name,
              date: formatedDate,
              time: time,
              note: note
        })
        setEdit(false)
    }

    if (edit === true) {
        return (
            <div className="dayDetailItem">
                <form onSubmit={handleSubmit}>
                <h3>
                    Name:
                    <input
                        className="formInput"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChangeName}
                        id="name"
                        required
                    />
                </h3>
                <div>
                    <span className="eventDate">
                        <span className="label">
                            Date:
                        </span>
                        <input
                            className="formInput"
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleChangeDate}
                            id="date"
                            required
                        />
                    </span>

                    <span className="eventTime">
                        <span className="label">
                            Time:
                        </span>
                        <input
                            className="formInput"
                            placeholder="00:00"
                            type="time"
                            name="time"
                            value={time}
                            onChange={handleChangeTime}
                            id="time"
                            required
                        />
                    </span>
                </div>
                <div className="eventNote">
                    <span className="label">
                        Note:
                    </span>
                    <textarea
                        className="noteInput"
                        name="note"
                        value={note}
                        onChange={handleChangeNote}
                        id="note"
                        required
                    />
                </div>
            <button type="submit"> Save</button>
            </form>
            </div>  
        )
    }

    else {
        return (
            <div className="dayDetailItem">
                <h3> {props.event.name} </h3>
                <img src={deleteIcon} onClick={handleDelete} className="detailIcon" alt="delete"/>
                <img src={editIcon} onClick={handleEdit} className="detailIcon" alt="edit"/>
                <div>
                    <span className="eventDate"> <span className="label">Date:</span> {props.event.date} </span>
                    <span className="eventTime"> <span className="label">Time:</span> {props.event.time} </span>
                </div>
                <div className="eventNote">
                    <span className="label">Note:</span> {props.event.note}
                </div>
            </div>
        )
    }
}

export default withFirebase(DayDetailItem)