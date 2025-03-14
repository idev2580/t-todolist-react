export interface TodoListItemObject{
    todoLabel:string
}
export interface TodoListDataObject{
    id:string,
    name:string,
    isOpened:boolean,
    todoItems:Array<TodoListItemObject>
}