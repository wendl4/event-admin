import React, {useState} from 'react'
import CarouselItem from './carouselItem'
import arrow from '../assets/images/arrowleft.png'

function Carousel(props) {

    const [move,setMovement] = useState("")


    let items = props.days.map((date, index) => {
        return <CarouselItem key={index} date={date} move={move} index={index} />
    })

    function moveLeft() {
        setMovement("left")
        setTimeout(function() {
            let date = new Date()
            date.setDate(props.centerDate.getDate()+1)
            props.handleDateChange(date)
            setMovement("")
        },2500)

    }

    function moveRight() {
        setMovement("right")
        setTimeout(function() {
            let date = new Date()
            date.setDate(props.centerDate.getDate()-1)
            props.handleDateChange(date)
            setMovement("")
        },2500)
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