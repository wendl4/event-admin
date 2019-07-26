import React, { useState, useEffect } from 'react'
import DayDetailItem from './dayDetailItem'
import { withFirebase } from './firebase'
import addButton from '../assets/images/addbutton.png'

function DayDetail(props) {

    const [events, setEvents] = useState([])

    function handleAdd() {
        props.firebase.events().push().set({
            date:props.centerDate,
            time:'00:00',
            name:"defaultName"
        })
    }
    
    useEffect (function() {
        props.firebase.events().orderByChild("date").equalTo(props.centerDate).on('value', snapshot => {
            let dbEvents = snapshot.val()
            let ev = []
            if (dbEvents!=null) {
                Object.keys(dbEvents).forEach(function(key) {
                    dbEvents[key]["id"] = key
                    ev.push(dbEvents[key])
                })
            }
            setEvents(ev)
        })
    },[props.centerDate, props.firebase])

    let displayedEvents = events.map(event =>
        <div className="dayDetail" key={event.id}>
            <DayDetailItem event={event} />
        </div>
    )

    return (
        <React.Fragment>
        {displayedEvents}
        <img src={addButton} onClick={handleAdd} className="addButton" alt="delete"/>
        </React.Fragment>
    )
}

export default withFirebase(DayDetail)