import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './DatePickerForm.css'
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const config = [{ title: '1 person', id: 1000, value: 1 },
{ title: '2 person', id: 1001, value: 2 },
{ title: '3 person', id: 1002, value: 3 },
{ title: '4 person', id: 1003, value: 4 },
{ title: '5 person', id: 1004, value: 5 },
{ title: '6 person', id: 1005, value: 6 },
{ title: '7 person', id: 1006, value: 7 },
{ title: '8 person', id: 1007, value: 8 },
{ title: '9 person', id: 1008, value: 9 },
{ title: '10 person', id: 1009, value: 10 },
{ title: '11 person', id: 1010, value: 11 },
{ title: '12 person', id: 1011, value: 12 }]


const DatePickerForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [persons, setPersons] = useState('1 person')

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({ date: startDate, persons })
  }

  return (
    <form className="data-picker-form" onSubmit={handleSubmit}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <select value={persons} onChange={(e) => setPersons(e.target.value)}>
        {config.map((item) => (
          <option key={item.id} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
      <button className="data-picker-btn" type="submit">Reserve</button>
    </form>

  )
}
export default DatePickerForm
