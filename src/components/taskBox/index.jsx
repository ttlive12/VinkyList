import React from "react";
import './index.css'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from '../column';
import { useState } from "react";
import { ModalForm } from '@ant-design/pro-components';
const TaskBox = ({ events, changeEvents, currentEvent, changeCurrentEvent, isEdit, setIsEdit }) => {

  const handleRemove = () => {

    changeEvents(() =>
      events.filter(item => item.title != currentEvent.title)
    )

    if (events.length) changeCurrentEvent(() => events[0])
  }
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }
  const changeTitle = (newTitle) => {
    changeEvents(events.map((event) => {
      if (event.title === currentEvent.title) {
        return {
          ...event,
          title: newTitle
        }
      }
      else {
        return event;
      }
    }))
  }
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const curEvent = events.find((item) => item.title === currentEvent.title);
    const taskCopy = curEvent[source.droppableId][source.index];
    changeEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          let eventCopy = { ...event };
          // Remove from source
          const taskListSource = event[source.droppableId];
          taskListSource.splice(source.index, 1);
          eventCopy = { ...event, [source.droppableId]: taskListSource };
          // Add to destination
          const taskListDes = event[destination.droppableId];
          taskListDes.splice(destination.index, 0, taskCopy);
          eventCopy = { ...event, [destination.droppableId]: taskListDes };
          return eventCopy;
        } else {
          return event;
        }
      })
    );
  }
  return (
    <div className="task-box">
      <header className="task-box-header">
        {isEdit ? <input className="task-box-title" value={currentEvent.title} onChange={e => changeTitle(e.target.value)} /> : <h1 className="task-box-title">{currentEvent.title}</h1>}
        <button className="remove-button" onClick={handleEdit}>{isEdit ? '确定' : '编辑'}</button>
        <ModalForm
          title="确认删除此任务表吗？"
          trigger={
            <div>
              <button className="remove-button">删除此任务表</button>
            </div>
          }
          submitter={{
            searchConfig: {
              submitText: '确认',
              resetText: '取消',
            },
          }}
          onFinish={() => {
            handleRemove()
            return true;
          }}
        >

        </ModalForm>

      </header>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className="task-box-body">
          {
            ['To do', 'In progress', 'Completed'].map((tag) => (
              <Column
                key={tag}
                tag={tag}
                events={events}
                changeEvents={changeEvents}
                currentEvent={currentEvent}
              />
            ))
          }
        </div>
      </DragDropContext>
    </div>
  )
}
export default TaskBox