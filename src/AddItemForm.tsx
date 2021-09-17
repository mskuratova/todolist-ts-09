import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (newTitle: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        // setNewTaskTitle("")
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim() )
            // setNewTaskTitle("")
        }
        else
        setError("Field is required")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
    }

    return <div>
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
}