import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.models';
import { borrar, borrarCompletados, crear, editar, toggle, toggleAll } from './todo.actions';
 
export const initialState : Todo[]=[
  new Todo('Salvar al mundo'),
  new Todo('Capitan America'),
  new Todo('Recolectar')
];
 
const _todoReducer = createReducer(
  initialState,
  on(crear, (state,{texto}) => [...state,new Todo(texto)]),
  on(borrar, (state,{id}) => state.filter(todo => todo.id!== id)),
  on(borrarCompletados, (state) => state.filter(todo => !todo.completado)),
  on(toggle, (state,{id}) => {
    return state.map(
      todo =>{
        if(todo.id === id){
          return {
            ...todo,
            completado : !todo.completado
          }
        }else{
          return todo;
        }
        
      }
    )
  }),
  on(toggleAll, (state,{completado}) => {
    return state.map(
      todo =>{
          return {
            ...todo,
            completado 
          }
      }
    )
  }),
  on(editar, (state,{id,texto}) => {
    return state.map(
      todo =>{
        if(todo.id === id){
          return {
            ...todo,
            texto
          }
        }else{
          return todo;
        }
        
      }
    )
  }),
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}