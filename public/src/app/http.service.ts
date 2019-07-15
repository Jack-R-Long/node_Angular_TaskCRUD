import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
   }

   getTasks(){
     return this._http.get('/tasks');
   }
   postTask(newtask){
     return this._http.post('/tasks', newtask)
   }
   editTaskServe(edit_task){
     console.log(edit_task)
     return this._http.put('/tasks/'+edit_task.id, edit_task)
   }
   deleteTaskServe(delete_task){
     return this._http.delete('/tasks/'+delete_task._id)
   }
}
