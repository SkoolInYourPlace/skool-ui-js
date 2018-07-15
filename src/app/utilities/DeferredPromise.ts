export class DeferredPromise<T> {

    private innerPromise: Promise<T>;
    private resolveFn: () => any;
    private rejectFn: () => any;

    constructor() {
        this.innerPromise = new Promise<T>((resFn, rejFn) => {
            this.rejectFn = rejFn;
            this.resolveFn = resFn;
        });
    }
}