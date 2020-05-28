import { Component, OnInit } from '@angular/core';
import {TodoInterface} from 'src/app/interfaces/todo'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  todos: TodoInterface[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string
  constructor() { }

  ngOnInit(): void {
    this.filter='all'
    this.beforeEditCache=''
    this.idForTodo=1;
    this.todoTitle = '';
    this.todos=[]
  }
  addTodo(): void{
    if(this.todoTitle.trim().length== 0){
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    })
    this.todoTitle='';
    this.idForTodo++;
    
  }
  editTodo(todo:TodoInterface):void{
    this.beforeEditCache=todo.title
    todo.editing=true
  }
  doneEdit(todo:TodoInterface):void{
    todo.editing=false
  }

  cancelEdit(todo: TodoInterface):void{
    todo.title= this.beforeEditCache
    todo.editing=false
  }
  deleteTodo(id:number,todo:TodoInterface):void
  {
    this.todos=this.todos.filter(todo => todo.id !== id)
    this.idForTodo=this.todos.length;
    this.refresh()
    
  }
  refresh():void{
    this.idForTodo=this.todos.length;
    var index=1
      this.todos.forEach(id => {
          id.id=index;
          index++;
      });
      this.idForTodo++;
    this.todosFiltered();
  }
  resta():number{
    return this.todos.filter(todo=> !todo.completed).length
  }
  atLeastOneCompleted(): boolean{
    return this.todos.filter(todo=> todo.completed).length>0
  }
  clearCompleted():void{
    this.todos=this.todos.filter(todo => !todo.completed)
    this.refresh()
  }
  checkAllTodos():void{
    this.todos.forEach(todo=> todo.completed = (<HTMLInputElement>event.target).checked)
  }
  todosFiltered(): TodoInterface[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
}