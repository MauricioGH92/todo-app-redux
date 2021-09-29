import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.models';
import { borrar, editar, toggle } from '../todo.actions';

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

  constructor(private store : Store<AppState>) { }
  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.textInput = new FormControl(this.todo.texto, Validators.required)
    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(toggle({id:this.todo.id}))
    })
  }

  editar(){
    this.editando = true;
    this.textInput.setValue(this.todo.texto);
    setTimeout(()=>{
      this.txtInputEditor.nativeElement.select();
    })
  }
  terminarEdicion(){
    this.editando = false;

    if(this.textInput.invalid){return}
    if(this.textInput.value === this.todo.texto){return}

    this.store.dispatch(editar({
      id:this.todo.id,
      texto:this.textInput.value}))
  }
  borrar(){
    this.store.dispatch(borrar({id:this.todo.id}))
  }

}
