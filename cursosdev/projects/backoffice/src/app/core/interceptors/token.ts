import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const token = sessionStorage.getItem("accessToken") || "";

    const clonedRequest = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
    })


    return next(clonedRequest);
}