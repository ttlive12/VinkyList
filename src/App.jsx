import React, { useEffect, useState } from 'react'
import EventBar from './components/eventBar'
import TaskBox from './components/taskBox'
import './App.css'
import { v4 as getId } from 'uuid';
function App() {
  const initEvent = () => [
    {
      id: getId(),
      title: '主任务表',
      ['To do']: [],
      ['In progress']: [],
      ['Completed']: [],
    }
  ]
  const [events, setEvents] = useState(initEvent)
  const [currentEvent, setCurrentEvent] = useState(events[0])
  const [isEdit, setIsEdit] = useState(false)
  const changeEvents = (events) => {
    setEvents(events)
  }
  const changeCurrentEvent = (currentevent) => {
    setCurrentEvent(currentevent)
  }
  useEffect(() => {
    if (localStorage.getItem('events')) {
      setEvents(JSON.parse(localStorage.getItem('events')))
    }
    if (localStorage.getItem('currentEvent')) {
      setCurrentEvent(JSON.parse(localStorage.getItem('currentEvent')))
    }
  }, [])
  useEffect(() => {
    if(events.length === 0) setEvents(initEvent)
    if(isEdit) changeCurrentEvent(events.find(event => event.id === currentEvent.id))
    localStorage.setItem('events', JSON.stringify(events));
  }, [events])
  useEffect(() => {
    localStorage.setItem('currentEvent', JSON.stringify(currentEvent));
  }, [currentEvent])
  return (
    <div className='App'>
      <EventBar events={events} currentEvent={currentEvent} changeEvents={changeEvents} changeCurrentEvent={changeCurrentEvent} />
      <TaskBox events={events} currentEvent={currentEvent} changeEvents={changeEvents} changeCurrentEvent={changeCurrentEvent} isEdit={isEdit} setIsEdit={setIsEdit} />
    </div>
  )
}

export default App
