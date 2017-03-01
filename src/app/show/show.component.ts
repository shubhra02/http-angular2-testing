import {Component, OnInit} from "@angular/core";
import {TaskService} from "../app.service";
import {RetTask} from "../returntaskdetails";
import {Router} from "@angular/router";
import {Tasks} from "../task"

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

   task : RetTask;
   returnTaskArr : RetTask[] = [];
   taskArray :Tasks[] = [];




    constructor(private router:Router,private service:TaskService){}


    ngOnInit() {
        this.reload();
        console.log(JSON.stringify(this.taskArray));
    }

    reload() {
        this.service.getData().subscribe(data => {
            this.returnTaskArr = data;
            console.log(JSON.stringify(data))
            console.log(JSON.stringify(this.returnTaskArr))
        }, (err: any) => {
            console.log(err)
        }, () => {
            console.log("Completed");
        });
    }

    editTask(index:number){
        this.router.navigate(['create',index])
    }


    deleteTask(index:number){
        this.service.delete(this.returnTaskArr[index]._id);
        console.log('Tasks Removed')
        this.router.navigate(['create'])
    }


}