import React, {useState} from 'react'
import CarouselItem from './carouselItem'
import arrow from '../assets/images/arrowleft.png'

function Carousel(props) {

    const [move,setMovement] = useState("")
    const [clicked,setClick] = useState(false)


    let items = props.days.map((date, index) => {
        return <CarouselItem key={index} date={date} move={move} index={index} />
    })

    function moveLeft() {
        if (clicked === false) {
            setClick(true)
            setMovement("left")
            setTimeout(function() {
                let date = new Date(props.centerDate)
                date.setDate(date.getDate()+1)
                props.handleDateChange(date)
                setMovement("")
                setClick(false)
            },2000)
        }

    }

    function moveRight() {
        if (clicked === false) {
            setClick(true)
            setMovement("right")
            setTimeout(function() {
                let date = new Date(props.centerDate)
                date.setDate(date.getDate()-1)
                props.handleDateChange(date)
                setMovement("")
                setClick(false)
            },2000)
        }
    }

    return (
        <React.Fragment>
            <img src={arrow} className='leftArrow' alt="leftArrow" onClick={moveLeft} />
            {items}
            <img src={arrow} className='rightArrow' alt="rightArrow" onClick={moveRight} /> 
        </React.Fragment>
    )
}

export default Carousel