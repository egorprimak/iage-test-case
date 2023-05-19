import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {API_LOGIN, API_REGISTER, USERS_KEY} from "../shared/consts";
import {STORAGE} from "../app.module";
import {User, UserLogin} from "../core/user/user.model";
import {getRandomString} from "../shared/utils/get-random-string";
import {getIdFromUrl} from "../shared/utils/get-id-from-url";
import {ApiMethod, FakeBackendResponse} from "./fake-backend.model";


@Injectable({
    providedIn: 'root'
})
export class FakeBackendService implements HttpInterceptor {
    private users: User[] = JSON.parse(this.storage.getItem(USERS_KEY) || '[]');

    constructor(@Inject(STORAGE) private readonly storage: Storage) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {url, method, body} = req;

        const checkRoute = (path: string, apiMethod: ApiMethod) => url.endsWith(path) && method === apiMethod;

        switch (true) {
            case checkRoute(`/${API_REGISTER}`, ApiMethod.POST):
                return this.registration(body);
            case checkRoute(`/${API_LOGIN}`, ApiMethod.POST):
                return this.login(body);
            case url.match(/\/users\/\d+/) && method === ApiMethod.PUT:
                return this.updateProfile(body, url);
            default:
                return next.handle(req);
        }
    }

    private updateProfile(params: any, url: string): Observable<HttpResponse<any>> {
        const id = getIdFromUrl(url);
        const user = this.users.find(i => i.id === id);
        if (!user) {
            return this.getResponse({
                status: 400,
                body: {
                    success: false,
                    error: true,
                    detail: 'Пользователь не найден'
                }
            });
        }

        Object.assign(user, params);
        this.overwriteStorageUsers();

        return this.getResponse({
            status: 200,
            body: {
                success: true,
                error: false,
                detail: 'Профиль успешно обновлен'
            }
        });
    }

    private login(body: UserLogin): Observable<HttpResponse<any>> {
        const {email, password} = body;

        const error = (detail: string) => ({
            status: 400,
            body: {
                error: true,
                success: false,
                detail
            }
        });

        const candidate = this.users.find(u => u.email === email);
        if (!candidate) {
            return this.getResponse(error('Пользователь с таким email не найден'));
        }

        if (candidate.password !== password) {
            return this.getResponse(error('Неверно указан пароль'));
        }

        return this.getResponse({
            status: 200,
            body: {
                token: 'test-jwt-token',
                error: false,
                success: true,
                detail: 'Вы авторизованы',
                user: candidate
            }
        });
    }

    private registration(body: User): Observable<HttpResponse<any>> {
        const {firstName, lastName, email, password, phone, websiteURL} = body;
        const candidate = this.users.find(u => u.email === email);
        if (candidate) {
            return this.getResponse({
                status: 400,
                body: {
                    error: true,
                    success: false,
                    detail: 'Пользователь с таким email уже существует'
                }
            });
        }

        // TODO: хэширование пароля на бэкенде...
        // ...

        const user: User = {
            id: getRandomString(),
            firstName,
            lastName,
            email,
            password,
            phone,
            websiteURL
        };

        this.users.push(user);
        this.overwriteStorageUsers();

        return this.getResponse({
            status: 200,
            body: {
                success: true,
                error: false,
                detail: 'Регистрация прошла успешно'
            }
        });
    }

    private getResponse(responseData: FakeBackendResponse): Observable<HttpResponse<any>> {
        const res = new HttpResponse(responseData);
        return of(res).pipe(delay(500));
    }

    private overwriteStorageUsers(): void {
        this.storage.setItem(USERS_KEY, JSON.stringify(this.users));
    }
}
