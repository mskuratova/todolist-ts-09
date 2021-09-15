import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    let [todolists, setTodolist] = useState< Array<TodolistType>> ( [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "active"},
    ])
    let [tasks, setTasks] =useState({
        [todolistId1]:[{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [todolistId2]: [{id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "water", isDone: false},
        ]
    })
    let removeTodolist = (todolistId:string) => {
        let filteredTodolist = todolists.filter(tl=> tl.id !== todolistId)
        setTodolist(filteredTodolist)
        delete  tasks[todolistId]
        setTasks({...tasks})
    }

    function removeTask(id: string, todolistId: string) {
        let tasksN = tasks[todolistId];
        let filteredTasks = tasksN.filter(t => t.id != id);
        tasks[todolistId] = filteredTasks
        setTasks({...tasks});
    }

    function addTask(newTitle: string, todolistId: string) {
        let tasksN = tasks[todolistId];
        let newTasks: TaskType[] = [{id: v1(), title: newTitle, isDone: false}, ...tasksN];
        setTasks({newTasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasksN = tasks[todolistId];
        let task = tasksN.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist= todolists.find(tl=> tl.id === todolistId);
        if(todolist) {
            todolist.filter =value;
            setTodolist([...todolists]);
        }

    }

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })
            }
        </div>
    );
}

export default App;
