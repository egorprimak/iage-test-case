import {Inject, Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {User} from "../core/user/user.model";
import {STORAGE} from "../app.module";
import {IsLoginData} from "../core/login/login.model";
import {IS_LOGIN, PROFILE, API_USERS} from "../shared/consts";

interface DatabaseData {
    users: User[];
    isLogin: IsLoginData;
    profile: User | null;
}

@Injectable({
    providedIn: 'root'
})
export class DbService implements InMemoryDbService {
    constructor(@Inject(STORAGE) private readonly storage: Storage) {
    }

    createDb(): DatabaseData {
        const users = this.getUsersFromLocalStorage();
        const isLogin = this.getIsLogin();
        const profile = this.getProfileData();
        return {users, isLogin, profile};
    }

    private getUsersFromLocalStorage(): User[] {
        const storageUsers = this.storage.getItem(API_USERS);
        if (!storageUsers) {
            return [];
        }
        return JSON.parse(storageUsers);
    }

    private getIsLogin(): IsLoginData {
        const storageIsLogin = this.storage.getItem(IS_LOGIN);
        if (!storageIsLogin) {
            return {value: 0};
        }
        return JSON.parse(storageIsLogin);
    }

    private getProfileData(): User | null {
        const storageProfileData = this.storage.getItem(PROFILE);
        if (!storageProfileData) {
            return null;
        }
        return JSON.parse(storageProfileData);
    }
}
