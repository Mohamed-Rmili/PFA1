import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Users } from '../classes/users';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Users>;
    public currentUser: Observable<Users>;

    constructor(private http: HttpClient,
        private router: Router) {
        this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Users {
        return this.currentUserSubject.value;
    }
    login(data) {
        console.log(data);
        return this.http.post<any>(`${environment.apiUrl}/api/login`, data)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log('currentUser',user); 
                localStorage.setItem('isloggedin','true');
                // user = JSON.parse(localStorage.getItem('currentUsers'));
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.setItem('isloggedin','false');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
    //3andek postman
    //yess
}