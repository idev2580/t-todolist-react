import { useState } from 'react';
import "../styles/TodoListContainer.css";

import TodoListComponent from './TodoListComponent';
import TodoListSetting from './TodoListSetting';
import type {TodoListDataObject, TodoListItemObject} from '../datatypes/TodoList'

interface TodoListContainerInput{
    key:string,
    todoList:TodoListDataObject
}
export default function TodoListContainer(
    {todoList}:TodoListContainerInput
    /*{
        todoList
    }:{[key: string]: TodoListDataObject;}*/
){
    const listName:string = todoList.name
    const isOpened:boolean = todoList.isOpened
    const isOpenedCssClassname:string = isOpened?"visible flex ":"hidden "
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    function toggleSetting(){
        setIsSettingOpen(!isSettingOpen)
    }
    return(
        <section className={isOpenedCssClassname + "t-todolist-container bg-gray-50 text-gray-900 shadow-sm shadow-gray-500/50"}>
            <section className="t-todolist-name-bar bg-gray-900 text-gray-50">
                <h1>{listName as string}</h1>
                <button onClick={toggleSetting}>
                    {/*<SvgIcon component={isSettingOpen ? CloseIcon : SettingsIcon} inheritViewBox></SvgIcon>*/}
                    <span className="material-icons">{isSettingOpen ? "close":"settings"}</span>
                </button>
            </section>
            <section className="t-todolist-container-contents">
                <TodoListComponent
                    todoItemsData={todoList.todoItems}
                ></TodoListComponent>
                <TodoListSetting
                    listName={listName as string}
                    isOpen={isSettingOpen as boolean}
                ></TodoListSetting>
            </section>
        </section>
    );
}