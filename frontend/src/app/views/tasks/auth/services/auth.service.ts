import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfig} from '@app/configs/api.config';
import {tap} from 'rxjs/operators';
import {Profile, ProfileInstAcc} from '@app/views/tasks/auth/types/profile';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

const emptyError = {name: '', message: '', hide: true};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoggedAs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    profile$: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);

    // @ts-ignore
    logginError$ = new BehaviorSubject<Error & { hide: boolean }>(emptyError);

    constructor(private http: HttpClient, private router: Router) {
        this.setLoggedIn();
    }

    get profile(): Profile {
        return this.profile$.getValue();
    }

    setLoggedIn() {
        this.getUser().subscribe({
            next: user => {
                this.loggedIn$.next(true);
                console.log(user);
                this.profile$.next(user);
            },
            error: (err) => {
                console.log('error in get profile', err);
                this.profile$.next(null);
                this.loggedIn$.next(false);
            }
        });
    }

    login(data) {
        console.log('выполняется вход');
        const body = new URLSearchParams();
        body.set('username', data.username);
        body.set('password', data.password);
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
            withCredentials: true
        };
        return this.http.post<Profile>(ApiConfig.login, body.toString(), options).subscribe({
            next: user => {
                this.logginError$.next(emptyError);
                this.profile$.next(user);
                this.loggedIn$.next(true);
                this.router.navigateByUrl('tasks');
            },
            error: err => {
                this.setErrorLogin(err.error);
                console.error(err);
            }
        });
    }

    logout() {
        return this.http.post(ApiConfig.logout, null, {
            withCredentials: true,
        }).pipe(
            tap(_ => {
                this.profile$.next(null);
                this.loggedIn$.next(false);
                this.router.navigateByUrl('home');
            })
        );
    }

    getUser() {
        return this.http.get<Profile>(ApiConfig.me, {withCredentials: true});
    }

    register(body: { username: string, password1: string, password2: string }) {
        return this.http.post(ApiConfig.signup, body, {
            withCredentials: true,
        })
    }


    public getUnsafeRequestHeaders() {
        const headers = {};
        const csrf = this.getCookie('csrftoken');
        if (csrf) {
            headers['X-CSRFToken'] = csrf;
        }
        return headers;
    }

    private getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    private setErrorLogin(error) {
        let err: Error & { hide: boolean };
        if (error.non_field_errors !== undefined) {
            err = {name: 'Ошибка', message: error.non_field_errors.join('\n'), hide: false};
        } else {
            err = {...error, hide: false};
        }
        this.logginError$.next(err);
    }

}
