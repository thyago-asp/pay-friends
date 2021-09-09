import { HttpParams, HttpParameterCodec } from "@angular/common/http";

export class CustomURLEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }
    encodeValue(key: string): string {
        return encodeURIComponent(key);
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
     }
    decodeValue(key: string) {
        return decodeURIComponent(key);
    }
}

export function toHttpParams(object: any): HttpParams {
    let params = new HttpParams({ encoder: new CustomURLEncoder() });

    Object.keys(object).forEach((key) => {
        if (!isNullOrUndefined(object[key])) {
            params = params.set(key, object[key]);
        }
    });

    return params;
};

export function isNullOrUndefined(val:any){
    return val === undefined || val === null;
}
