'use client'
import { useState } from 'react';
import Icon from '@mui/material/Icon';

import type {TodoListDataObject, TodoListItemObject} from '../datatypes/TodoList'
import "../styles/TodoListComponent.css";

export default function TodoListComponent(
    {
        todoItemsData
    }:{[key: string]: Array<TodoListItemObject>;}
){
    const [todoItems, setTodoItems] = useState(
        new Map(
            todoItemsData.map((value)=>{
                const key = Math.floor(Math.random() * 100000)
                return [key, {
                    label: value.todoLabel,
                    isComplete: false
                }]
            })
        )
    )
    function updateTodoItems(){
        const newTodoItems = new Map(
            Array.from(todoItems.keys()).map((key)=>{
                const item = todoItems.get(key)!!
                return [key, item]
            })
        )
        setTodoItems(newTodoItems)
    }
    function checkTodoItem(todoItemKey:number){
        const todoItem = todoItems.get(todoItemKey)!!
        todoItem.isComplete = !todoItem.isComplete
        updateTodoItems()
    }
    const listedItems = Array.from(todoItems.keys()).map((key)=>{
        const todoItem = todoItems.get(key)!!
        const todoIsComplete:boolean = todoItem.isComplete
        return (
            <li key={key} className="t-todolist-todoitem">
                <button className="t-todolist-todoitem-checkbtn"onClick={()=>checkTodoItem(key)}>
                    {/*<SvgIcon component={todoItem.isComplete? CheckCircleIcon : CheckCircleOutlineIcon} inheritViewBox></SvgIcon>*/}
                    <span className="material-icons">{todoItem.isComplete?"check_circle" : "radio_button_unchecked"}</span>
                </button>
                <input type="text" defaultValue={todoItem.label}></input>
            </li>
        )
    })
    return(
        <ul className="t-todolist-todoitems">
            {listedItems}
        </ul>
    );
}