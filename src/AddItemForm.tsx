import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (newTitle: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
         setTitle("")
    }
    const addTItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim() )
            setTitle("")
        }
        else
        setError("Field is required")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
    }

    return <div>
        <input value={title}
               onChange={onChangeHandler}
               className={error ? "error" : ""}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTItem}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}