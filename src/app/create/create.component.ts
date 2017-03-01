import {Component,OnInit} from '@angular/core';
import {Tasks} from '../task';
import {TaskService} from "../app.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ReturnTask} from "../returntaskdetails";


@Component({
    moduleId:module.id,
    selector:'home',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

    tasks:ReturnTask[] = [];
    task:Tasks = new Tasks();
    filler:string = ''
    index:number;
    constructor(private taskrouter:Router,private taskroute:ActivatedRoute,private taskservice:TaskService){}

    ngOnInit() {
        this.taskroute.params.subscribe((data: any) => {
            this.index = +data.indexSent;
            if (this.index || this.index === 0) {
                this.taskservice.getData().subscribe((data: any) => {
                        this.task = data[this.index]
                        console.log(JSON.stringify(data))
                    },
                    (err: any) => alert(err), () => {
                        console.log('Success')
                    });
            }
        });
    }



    submit() {
        if (this.index || this.index === 0) {
            this.taskservice.update(this.task)
        } else {
            this.taskservice.add(this.task)
        }
        this.taskrouter.navigate(['show']);
    }
}
