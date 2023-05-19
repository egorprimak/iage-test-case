import {HttpHeaders} from "@angular/common/http";
import {ActionResult} from "../core/actions/action.model";
import {User} from "../core/user/user.model";

export enum ApiMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

interface HttpParams<T> {
    body?: T | null;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
}

export interface FakeBackendActionResult extends Partial<ActionResult> {
    user?: User;
    token?: string;
}

export type FakeBackendResponse = HttpParams<FakeBackendActionResult>;
