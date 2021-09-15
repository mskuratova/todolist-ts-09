import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setNewTaskTitle("")
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Field is required")
            return
        }
        props.addTask(newTaskTitle.trim(), props.id)
        setNewTaskTitle("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => {
      props.removeTodolist(props.id)
    }

    return <div>
        <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>

        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   className={error ? "error" : ""}
                   onKeyPress={onKeyPressHandler}
                // {(e) => {
                // if (e.charCode ===13) {props.addTask(newTaskTitle)
                //     setNewTaskTitle("")}
                // }}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id, props.id)
                        }}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className= {props.filter ==="all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className= {props.filter ==="active" ? "active-filter" : ""}onClick={onActiveClickHandler}>Active</button>
            <button className= {props.filter ==="completed" ? "active-filter" : ""}onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
