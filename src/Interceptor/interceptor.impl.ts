import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-Interceptors';

export class ServerUrlInterceptor implements Interceptor {

    public interceptBefore(request:InterceptedRequest): InterceptedRequest {
        if(localStorage.getItem('isLoggedIn') == "true") {
            console.log(request);
            request.options.headers.append("Authorization", "Bearer "+localStorage.getItem('token'));
        }
        console.log('request :: ' , request);
        return request;
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        console.log(response);
        return response;
    }
}