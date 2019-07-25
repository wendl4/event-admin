/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState,useEffect } from 'react'
import './App.css'
import Carousel from './carousel'
import DatePicker from 'react-date-picker'
import './datePicker.css'
import DayDetail from './dayDetail'

function App(props) {

  const [date, setDate] = useState(new Date())
  const [displayedDays,setDays] = useState([])

  useEffect (function() {
    setWeekEvents(date)
  },[])

  function parseDate(inputDate) {
    return `${inputDate.getMonth()+1}/${inputDate.getDate()}/${inputDate.getFullYear()}`
  }

  function setWeekEvents(inputDate) {
    let days = generateDays(inputDate)
    setDays(days)
  }

  function generateDays(date) {
    let days = []
    for (let i=-3;i<4;i++) {
      let day = new Date(date)
      day.setDate(date.getDate()+i)
      days.push(parseDate(day))
    }
    return days
  }

  function handleDateChange(inputDate) {
    setDate(inputDate)
    setWeekEvents(inputDate)
  }

  return (
    <div className="App">
      <div>
        <h1 className="App-heading">
          <span className="App-nexalight">EVENT </span>
          <span className="App-nexabold">ADMIN</span>
        </h1>
      </div>
      <Carousel centerDate={date} days = {displayedDays} handleDateChange = {handleDateChange}/>
      <div>
        <DatePicker
          className="datePickerElement"
          onChange={handleDateChange}
          format="M/d/y"
          value={date}
        />
      </div>
      <DayDetail centerDate={parseDate(date)}/>
    </div>

  )
}

export default App
