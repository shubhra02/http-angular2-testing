import {Injectable} from '@angular/core';
import {Tasks} from './task';
import {Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()

export class TaskService{

    constructor(private http:Http){}

    getData(): Observable<any> {
        let jsonHeader = new Headers({
            'Content-Type':'application/json'
        });

        return this.http.get('http://localhost:9000/get/all',{headers:jsonHeader})
            .map((data:any)=>{
            return this.extractData(data)
            })

    }




    add(task:Tasks){
        this.addData(task).subscribe((data:any) =>{
            console.log("Success subscribe");
        },(err:any)=>{
            console.log(err);
        },()=>{
            console.log("Completed");
        });
    }

    delete(index:string){
        this.deleteData(index).subscribe((data:any) =>{
        }, (err:any)=>{
            console.log(err)
        }, ()=>{
            console.log("Completed.")
        });
    }

    update(task:Tasks){
        this.updateData(task).subscribe((data:any) =>{
        }, (err:any)=>{
            console.log(err)
        }, ()=>{
            console.log("Completed.")
        });

    }

    deleteData(id:string):Observable<any>{
        let jsonHeaders = new Headers({
            'Content-Type': 'application/json'
        })

        return this.http.get('http://localhost:9000/remove/'+id, {headers:jsonHeaders})
            .map((response:any)=>{
                return this.extractData(response);
            });

    }


    addData(task: Tasks): Observable<any> {

        let jsonHeader = new Headers({
            'Content-Type': 'application/json'
        });

        let obj = {
            date: task.date,
            title: task.title,
            description: task.description,
            priority: task.priority
        }

        return this.http.post('http://localhost:9000/add', obj, {headers: jsonHeader})
            .map((data:any) => {
                console.log("Success");
                return this.extractData(data)
            })
            .catch((e:any) => {
                console.log("failed");
                return this.handleError(e)
            })
    }

    updateData(task:Tasks):Observable<any>{
        //First we define header before every http call.
        let jsonHeaders = new Headers({
            'Content-Type': 'application/json'
        })

        let obj = {
            date: task.date,
            title: task.title,
            description: task.description,
            priority: task.priority
        };


        return this.http.post('http://localhost:9000/update', obj, {headers:jsonHeaders})
            .map((response:any)=>{
                return this.extractData(response)
            }).catch((e:any)=>{
                console.log("Something went wrong with post.");
                return Observable.throw<any>(new Error("error"));
            });
    }

    private extractData(result:any){
        let body = result.json();
        return body;
    }

    private handleError(error:any){
        let errorMsg:string;

        try {
            if (JSON.parse(error._body).message) {
                errorMsg = JSON.parse(error._body).message;
            } else {
                errorMsg = 'Something went wrong. Please try again later'
            }
        } catch (er){
            errorMsg = 'Something went wrong. Please try again after some time'
        }
        return Observable.throw(new Error(errorMsg));
    }
}