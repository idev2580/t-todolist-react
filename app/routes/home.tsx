import { useState } from 'react';
import "../styles/TodoListView.css";

import TodoListContainer from "../components/TodoListContainer"
import type { TodoListDataObject, TodoListItemObject } from '../datatypes/TodoList';

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "T-Todolist" },
    { name: "description", content: "Trigger-based Todolist!" },
  ];
}

export default function TodoListView(){
    //Sample Data
    const [todoListMap, setTodoListMap] = useState(
        new Map([
            ["DEFAULT", {
                name : "Default", 
                isOpened: false,
                todoItems:[
                    {todoLabel:"자소서쓰기"},
                    {todoLabel:"TodoList (React+Flask) Complete"}
                ]
            }],
            ["WORKS", {
                name : "Works", 
                isOpened: false,
                todoItems:[]
            }],
            ["ASSIGNMENTS", {
                name : "Assignments", 
                isOpened: false,
                todoItems:[]
            }],
            ["SIDE_PROJECTS", {
                name : "Side-Projects", 
                isOpened: false,
                todoItems:[]
            }],
        ])
    )

    //Actual codes
    function todoListButtonClicked(id:string){
        const prevVal = todoListMap.get(id)!!.isOpened
        todoListMap.get(id)!!.isOpened = !prevVal

        const newTodoListMap = new Map()
        todoListMap.forEach((value, key)=>{
            newTodoListMap.set(key, value)
        })
        setTodoListMap(newTodoListMap);
    }
    const todoListAsideButtons = Array.from(todoListMap.keys()).map((key) => {
        const todoList = todoListMap.get(key)!!
        return (<button 
            key={key}
            id={key}
            onClick={()=>todoListButtonClicked(key)}
            className={"todolist-view-aside-btn " + (todoList.isOpened ? " bg-gray-300" : "bg-gray-50")}
        >
            <p>{todoList.name}</p>
        </button>
        )
    })

    const todoListViews = Array.from(todoListMap.keys())
    .map((key) => {
        const todoList = todoListMap.get(key)!!
        const todoListDataObj:TodoListDataObject = {
            id: key,
            isOpened: todoList.isOpened,
            name: todoList.name,
            todoItems: todoList.todoItems as Array<TodoListItemObject>
        }
        return (
            <TodoListContainer key={key} todoList={todoListDataObj}></TodoListContainer>
        )
    })


    return(
        <div className="todolist-view">
            <aside>
                {todoListAsideButtons}
            </aside>
            <main>
                {todoListViews}
            </main>
        </div>
    );
}

/*export default function Home() {
  return <Welcome />;
}*/
