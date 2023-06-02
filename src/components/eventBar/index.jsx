import React from "react";
import './index.css';
import { v4 as getId } from 'uuid';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
const EventBar = ({ events, currentEvent, changeEvents, changeCurrentEvent }) => {
  const addEvent = (val) => {
    const title = val.tt
    if (events.find(event => event.title === title)) {
      alert('Event已经存在了！');
      return;
    }
    if (title) {
      changeEvents(() => [
        ...events,
        {
          id: getId(),
          title,
          ['To do']: [],
          ['In progress']: [],
          ['Completed']: [],
        },
      ])
    } else {
      alert('Event不能为空')
    }
  }

  return (
    <div className="event-bar">
      <h1 className="event-bar-title">Vinky TodoList</h1>
      <ModalForm
        title="新建任务表"
        trigger={<button className="event-bar-add-button">+</button>}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onFinish={ (values) => {
          console.log(values);
          addEvent(values);
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="tt"
          label="标题"
          placeholder="输入任务表标题"
        />
      </ModalForm>
      <div className="event-container">
        {
          events.map((item) => (
            <div
              key={item.title}
              className={`event over-hide ${currentEvent.id === item.id ? 'selected-event' : ''}`}
              onClick={() => changeCurrentEvent(item)}
            >
              {item.title}
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default EventBar