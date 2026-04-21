import { Component, inject, OnInit, signal } from '@angular/core';
import { Todos } from '../services/todos';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItems } from '../components/todo-items/todo-items';

@Component({
  selector: 'app-todo',
  imports: [TodoItems],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class TodoComponent implements OnInit {
  todoService = inject(Todos);
  todoItems = signal<Todo[]>([]);

  ngOnInit(): void {
    // this.todoItems.set(this.todoService.todoItems);
    this.todoService.getTodosFromApi().pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((todos) => {
      this.todoItems.set(todos);
    })
  }

  updateTodoItem(todoItem: Todo){
  this.todoItems.update((todos) => {
    return todos.map(todo => {
      if (todo.id === todoItem.id ){
        return{
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  });
  }
}
