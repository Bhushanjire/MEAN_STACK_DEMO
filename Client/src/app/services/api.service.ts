import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ExceptionService } from './../services/exception.service';
import { map, catchError, finalize } from 'rxjs/operators';
import { EndpointService, IApiEndpoint } from './../services/endpoint.service';


export interface ApiParam {
  data?: object;
  queryParams?: object;
  pathParams?: object;
  // query: Object;
}

export interface ApiResponse {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private endpointService: EndpointService,
  ) { }

  register(name: string, params?: ApiParam){
    const endpoint = this.getEndpoint(name);
    const url = this.addPathParamsIfAny(endpoint.url, params);
    return this.http.post(url,params.data);
  }

  login(name: string, params?: ApiParam){
    const endpoint = this.getEndpoint(name);
    const url = this.addPathParamsIfAny(endpoint.url, params);
    return this.http.post(url,params.data);
  }

  request(name: string, params?: ApiParam){
    const endpoint = this.getEndpoint(name);
    const url = this.addPathParamsIfAny(endpoint.url, params);
    let method: string;
    if (endpoint.method) {
      method = endpoint.method;
    }
    const requestOptions = {
      headers: this.getHeader(),
      // method: endpoint.method,
      body: params ? params.data : {},
      search: this.getQueryParams(params)
    };

    return (
      this.http
        .request(method, url, requestOptions)
        .pipe(map(res => this.extractData<ApiResponse>(res)))
        // .pipe(map(res => this.extractData<any>(res)))
        .pipe(catchError(this.exceptionService.catchBadResponse))
        // .pipe(finalize(() => this.loadingService.hide()))
    );
  }

  getHeader(){
    const token = localStorage.getItem('MYAPP_USER');
    let requestHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    if (token && !requestHeaders.has('Authorization')) {
      requestHeaders = requestHeaders.append('Authorization', 'Token ' + token);
    }
    return requestHeaders;
  }

  private getQueryParams(params: ApiParam): HttpParams {
    const queryParam = new HttpParams();

    if (params && params.queryParams) {
      for (const key in params.queryParams) {
        if (params.queryParams.hasOwnProperty(key)) {
          const value = params.queryParams[key];
          queryParam.append(key, value);
        }
      }
    }
    return queryParam;
  }

  private extractData<R>(res) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res ? res : null;

    // if (!body.success)
    //     throw new Error('Request was not successfull with an Error ->: ' + body.result.message);

    return (body || {}) as R;
  }

  private getEndpoint(name: string): IApiEndpoint {
    const endpoint = this.endpointService.get(name);

    if (!endpoint) {
      throw new Error('No endpoint is registered with' + name);
    }
    return endpoint;
  }

  private addPathParamsIfAny(url: string, data: ApiParam): string {
    if (data && data.pathParams) {
      for (const key in data.pathParams) {
        if (data.pathParams.hasOwnProperty(key)) {
          url = url.replace(key, data.pathParams[key]);
        }
      }
    }
    return url;
  }


  getUserDetails(data){
    const decodedToken = this.helper.decodeToken(data);
    const expirationDate = this.helper.getTokenExpirationDate(data);
    const isExpired = this.helper.isTokenExpired(data);
    
    return JSON.parse(JSON.stringify(decodedToken.data));
  }
}
