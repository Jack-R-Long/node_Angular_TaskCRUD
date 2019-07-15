import {HttpService} from './http.service' ;
import { Component, OnInit} from '@angular/core'  //Add oninit 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks = [];
  newTask: any;
  editedTask: any;
  is_editedTask: boolean; 
	
	constructor(private _httpService: HttpService){
	}
	ngOnInit(){
    this.getFromService()
    this.newTask = {title: "", description: ""};
    this.is_editedTask = false;

	}
	getFromService(){
		let observable = this._httpService.getTasks()
		observable.subscribe(data => {
      console.log("Got our data")
			this.tasks = data['data']
		})
  }
  onSubmit(){
    let observable = this._httpService.postTask(this.newTask)
    observable.subscribe(data =>{
      console.log("Posted task and returned")
      //Reset task object 
      this.newTask = {this: "", description: ""}
      this.getFromService()
    })
  }
  showEditForm(task_select){
    this.is_editedTask = true; 
    this.editedTask = {'title': task_select.title, 'description': task_select.description, 'id': task_select._id}
    // console.log(this.editedTask)
    console.log("About to edit task")
  }
  editTask(){
    let observable = this._httpService.editTaskServe(this.editedTask)
    observable.subscribe(data =>{
      console.log("Edited task and returned")
      //Reset Edited Task Obj
      this.editedTask = {this: "", description: "", id: ""}
      this.is_editedTask = false;
      this.getFromService()
    })
  }
  deleteTask(task_select){
    let observable = this._httpService.deleteTaskServe(task_select)
    observable.subscribe( data=>{
      console.log("Deleted Task")
      this.getFromService()
    })
  }
}
