import {Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FakeBackendService} from "../../db/fake-backend.service";

export const fakeBackend: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendService,
    multi: true
};
