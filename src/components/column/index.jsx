import Task from '../task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import './index.css';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
const Column = ({ tag, currentEvent, events, changeEvents }) => {
  const handleAdd = (values) => {
    const name = values.name;
    const details = values.details;
    if (!(name && details)) return;
    changeEvents(() => {
      const arrCopy = [...events];
      const index = events.findIndex(
        (event) => event.title === currentEvent.title
      );
      const eventCopy = arrCopy[index];
      // Remove old and add the latest data
      arrCopy.splice(index, 1, {
        ...eventCopy,
        [tag]: [
          ...eventCopy[tag],
          { name: name, id: uuid(), details: details },
        ],
      });
      return arrCopy;
    })
  }
  const handleRemove = (id, e) => {
    // 禁止冒泡到上层:修改task
    e.stopPropagation();
    changeEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList] };
        } else {
          return event;
        }
      })
    );
  }
  const handleUpdate = (id,values) => {
    const name = values.name;
    const details = values.details;
    if (!(name && details)) return;
    changeEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          const updatedTask = {
            ...taskList[index],
            name,
            details,
          };
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList, updatedTask] };
        } else {
          return event;
        }
      })
    );
  }
  return (
    <div className='column'>
      {tag}
      <ModalForm
        title="添加一个任务"
        trigger={<button className="add-task-button">+</button>}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onFinish={(values) => {
          handleAdd(values)
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="任务名称"
          placeholder="输入任务名称"
        />
        <ProFormText
          width="md"
          name="details"
          label="任务内容"
          placeholder="输入任务内容"
        />
      </ModalForm>
      <Droppable droppableId={tag}>
        {
          (provided, snapshot) => {
            return (
              <div
                className='task-container'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {events
                  .find((event) => event.title === currentEvent.title)
                  ?.[tag].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Task
                          name={item.name}
                          details={item.details}
                          id={item.id}
                          provided={provided}
                          snapshot={snapshot}
                          handleRemove={handleRemove}
                          handleUpdate={handleUpdate}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            );
          }
        }
      </Droppable>
    </div>
  )
}
export default Column