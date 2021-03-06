import React, { FunctionComponent, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import List, { ListProps } from 'components/List/List';
import {
  mapStateToProps,
  mapDispatchToProps,
} from 'components/ListsContainer/ListsContainer';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const ListsDND: FunctionComponent<Props> = props => {
  const {
    updateListTasks,
    lists,
    order,
    getTasks,
    updateTask,
    updateListsOrderAndSendToServer,
    deleteList,
    boardId,
    getListsForBoard,
  } = props;

  function onDragEnd(result: DropResult) {
    const {
      destination,
      source,
      draggableId,
      type,
    } = result;

    if (!destination) {
      return;
    }

    const apiId = draggableId.split('-')[0];

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === `LIST`) {
      const newListOrder = Array.from(order);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, apiId);

      updateListsOrderAndSendToServer(apiId, newListOrder);
      return;
    }

    const start: ListProps = lists[source.droppableId];
    const finish: ListProps =
      lists[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, apiId);
      const newList = {
        ...start,
        taskIds: newTaskIds,
      };

      updateListTasks(newList.id, newList);
      updateTask(newList.id, apiId, newTaskIds);
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartList = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, apiId);
    const newFinishList = {
      ...finish,
      taskIds: finishTaskIds,
    };
    // update both lists
    updateListTasks(newStartList.id, newStartList);
    updateListTasks(newFinishList.id, newFinishList);

    updateTask(newFinishList.id, apiId, finishTaskIds);
  }

  return (
    <>
      {
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={`board`}
            direction={`horizontal`}
            type={`LIST`}
          >
            {provided => (
              <div
                className={`d-inline-flex`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {order.map(
                  (listId: number, index: number) => {
                    return (
                      <div key={listId}>
                        <List
                          id={listId}
                          {...lists[listId]}
                          deleteHandler={() =>
                            deleteList(listId)
                          }
                          tasksRequestHandler={getTasks}
                          index={index}
                        />
                      </div>
                    );
                  }
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      }
    </>
  );
};

export default ListsDND;
