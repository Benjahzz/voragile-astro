import React from 'react'
import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { cn } from '@/libs/utils'
import type { Task as TaskType } from '@/types'
import { twMerge } from 'tailwind-merge'

interface TaskProps {
  task: TaskType,
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot
}

const Task: React.FC<TaskProps> = ({ task, provided, snapshot }) => {

  return (
    <div className={`min-h-[70px] md:min-h-[100px] w-full my-2`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
      <div className={`flex items-center gap-4 p-4 h-full bg-white shadow-md border shadow-slate-300 rounded-md ${snapshot.isDragging && "bg-gray-50 border-primary shadow-none -rotate-1 transition-transform"} ${snapshot.isDropAnimating && "rotate-0"}`}>
        <div className={`w-6 h-6 rounded-full p-6 flex items-center justify-center text-lg ${task.textColor?? "text-white"} ${task.bgColor ?? "bg-primary"}`}> 
          {task.letter}
        </div>
        <p>{task.content}</p>
      </div>
    </div>
  )
}

export default Task