import { ModalForm, ProFormText } from '@ant-design/pro-components';
const Task = ({ name, details, id, provided, handleUpdate, handleRemove }) => {
  return (

    <ModalForm
      title="修改一个任务"
      trigger={
        <div
          className='task'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2 className='task-name over-hide'>{name}</h2>
          <p className='task-details'>{details}</p>
          <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
            -
          </div>
        </div>
      }
      submitter={{
        searchConfig: {
          submitText: '确认',
          resetText: '取消',
        },
      }}
      onFinish={(values) => {
        handleUpdate(id,values)
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
  );
};

export default Task;

/*


*/
