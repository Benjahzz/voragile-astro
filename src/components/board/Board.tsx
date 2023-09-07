'use client'
import { useState } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import Column from './Column.tsx'
import { ArrowLeftRight } from 'lucide-react';
import type { Task } from '@/types.js';


interface Column {
    id: string;
    title: string;
    taskIds: number[];
}

const initialData: { tasks: Record<string, Task>, columns: Record<string, Column>, columnOrder: string[] } = {
    tasks: {
        1: { id: 1, content: 'Take out the garbage', letter: 'K',textColor: 'text-white'},
        2: { id: 2, content: 'Watch my favorite show', letter: 'B', bgColor: 'bg-blue-500' },
        3: { id: 3, content: 'Charge my phone',letter: 'A', bgColor: 'bg-orange-500'  },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: [1, 2, 3],
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2'],
}

const reorderColumnList = (sourceColumn: Column, startIndex: number, endIndex: number) => {
    const newTaskIds = Array.from(sourceColumn.taskIds)
    const [removed] = newTaskIds.splice(startIndex, 1)
    newTaskIds.splice(endIndex, 0, removed)

    const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
    }
    return newColumn
}
export default function Home() {
    const [data, setData] = useState(initialData)

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        // Unkown destination
        if (!destination) return

        // No changes
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        const sourceColumn = data.columns[source.droppableId]
        const destinationColumn = data.columns[destination.droppableId]

        if (sourceColumn.id === destinationColumn.id) {
            const newColumn = reorderColumnList(sourceColumn, source.index, destination.index)

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            }
            setData(newData)
            return

        }

        const startTaskIds = Array.from(sourceColumn.taskIds)
        const [remove] = startTaskIds.splice(source.index, 1)
        const newStartColumn = {
            ...sourceColumn,
            taskIds: startTaskIds,
        }
        const endTaskIds = Array.from(destinationColumn.taskIds)
        endTaskIds.splice(destination.index, 0, remove)
        const newEndColumn = {
            ...destinationColumn,
            taskIds: endTaskIds,
        }

        const newData = {
            ...data,
            columns: {
                ...data.columns,
                [newStartColumn.id]: newStartColumn,
                [newEndColumn.id]: newEndColumn,
            },
        }
        setData(newData)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='flex justify-between items-center flex-row  gap-20 p-6 bg-gray-50 bg-opacity-10  rounded-md'>
                <Column column={data.columns['column-1']} tasks={data.columns['column-1'].taskIds.map((taskId) => data.tasks[taskId])} />
                <ArrowLeftRight size={100} className='text-white hidden lg:block' />
                <Column column={data.columns['column-2']} tasks={data.columns['column-2'].taskIds.map((taskId) => data.tasks[taskId])} />
            </div>
        </DragDropContext>
    )
}
