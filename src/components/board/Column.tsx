import React, { Children } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import Task from './Task'
import type { Task as TaskType } from '@/types'

interface ColumnProps {
    column: {
        id: string
        title: string
        taskIds: number[]
    },
    tasks: TaskType[]
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
    return (
        <div className=' flex flex-col items-center w-full'>
            <h3 className='text-center mb-4 text-white text-lg'>{column.title}</h3>
            <div className='bg-white h-[300px] md:h-[400px]  w-full rounded-sm'>
                <Droppable droppableId={column.id}>
                    {(droppableProvided, droppableSnapshot) => (
                        <ul ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className='flex flex-col p-6 h-full relative'>
                            {
                                tasks.map((task, index) => {
                                    return <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                        {(draggableProvided, draggableSnapshot) => (
                                            <Task task={task} provided={draggableProvided} snapshot={draggableSnapshot} />

                                        )}
                                    </Draggable>
                                })
                            }
                            {
                                droppableProvided.placeholder
                            }
                            {
                                tasks.length === 0 && (
                                    <div className='flex flex-col items-center  h-full absolute w-full top-0 left-0 p-6 justify-between'>
                                        {
                                            Children.toArray(
                                                [...Array(3)].map(() => (
                                                    <div className="min-h-[70px] md:min-h-[100px] w-full border border-dashed border-gray-300 rounded-md p-6 flex items-center justify-center text-gray-400">
                                                        Drop a Task here
                                                    </div>
                                                )
                                                )
                                            )
                                        }
                                    </div>
                                )
                            }

                        </ul>


                    )}

                </Droppable>

            </div>
        </div>
    )
}

export default Column