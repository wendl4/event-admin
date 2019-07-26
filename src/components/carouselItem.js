/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './carouselItem.css'
import { withFirebase } from './firebase'

function CarouselItem(props) {
    const [loading,setLoading] = useState(true)
    const [events, setEvents] = useState([])
    let classNames = setClasses()
    
    useEffect (function() {
        setLoading(true)
        let ref = props.firebase.events().orderByChild("date").equalTo(props.date)
        let onValueChange = ref.on('value', snapshot => {
            let dbEvents = snapshot.val()
            let ev = []
            if (dbEvents!=null) {
                Object.keys(dbEvents).forEach(function(key) {
                    ev.push(<div key={key}>&#183; {dbEvents[key].name}</div>)
                })
            }
            setEvents(ev.slice(0,2))
            setLoading(false)
        })
        return function() {
            ref.off('value', onValueChange)
        }
    },[props.date])


    function setClasses() {
        let names = []
        names.push(props.index === 3 ? "carouselMain" : "carouselDiv")

        if (props.index === 0 || props.index === 6) {
            names.push("hiddenElement")
        }

        if (props.move === "left") {
            names.push("leftAnimated")

            if (props.index === 6) {
                names.push("growRight")
            }

            if (props.index === 4) {
                names.push("mainFromRight")
            }

            if (props.index === 1) {
                names.push("hideFirst")
            }
        }

        else if (props.move === "right") {
            names.push("rightAnimated")

            if (props.index === 0) {
                names.push("growLeft")
            }

            if (props.index === 2) {
                names.push("mainFromLeft")
            }

            if (props.index === 5) {
                names.push("hideLast")
            }
        }
        return names
    }


    return (
        <div className={classNames.join(" ").concat(loading ? " blurred" : "")}>
            <div className="carouselHeading">
                {props.date}
            </div>
            <div className="carouselBody">
                {events}
            </div>
        </div>
    )
}

export default withFirebase(CarouselItem)