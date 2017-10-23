import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorService } from 'ng2-interceptors';
import { ServerUrlInterceptor } from '../Interceptor/interceptor.impl';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { AuthService } from '../app/services/auth-service';

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverUrlInterceptor:ServerUrlInterceptor) {

    let service = new InterceptorService(xhrBackend, requestOptions);
    service.addInterceptor(serverUrlInterceptor);
    return service;
}

@NgModule({
    declarations: [ ],
    imports: [ CommonModule ],
    exports: [ ],
    providers: [
        ServerUrlInterceptor,
        AuthService,
        {
            provide: InterceptorService,
            useFactory: interceptorFactory,
            deps: [XHRBackend, RequestOptions, ServerUrlInterceptor] 
        }
    ],
})
export class InterceptorModule {}