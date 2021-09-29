import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @ViewChild('inputEditor') txtInputEditor : ElementRef;

  chkCompletado: FormControl;
  textInput: FormControl;

  editando: boolean = false;

  constructor() { }
  ngOnInit(): void {
    this.todo = {...this.todo, completado:true};
    this.chkCompletado = new FormControl(this.todo.completado);
    this.textInput = new FormControl(this.todo.texto, Validators.required)
  }

  editar(){
    this.editando = true;
    setTimeout(()=>{
      this.txtInputEditor.nativeElement.select();
    })
  }
  terminarEdicion(){
    this.editando = false;
  }

}
