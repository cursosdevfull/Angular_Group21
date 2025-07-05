import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
    const apiKey = "live_JAPG5VY77krHqVTRfAbFM8R6qdnizHAqltMw0b1T3VRkiNz9e335eoJ8o210L1km"

    /*     const clonedRequest = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        }) */

    const clonedRequest = req.clone({
        headers: req.headers.append("x-api-key", apiKey)
    })

    return next(clonedRequest);
}