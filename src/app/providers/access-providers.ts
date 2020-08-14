import {Injectable} from '@angular/core';
import{ HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
@Injectable()
export class AccessProviders{
    server : string = 'http://localhost/Jona/Api/';

    constructor(
        public http:HttpClient
        )
    {}
    postData(body, file){
        let headers = new HttpHeaders({
            'Content-Type':'application/json; charset-UTF-8'
        });
        let options ={
            headers: headers
        }
        return this.http.post(this.server + file, JSON.stringify(body),options )
        .timeout(22000)
        .map(res=> res);
    }
    }
