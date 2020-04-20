import { Router } from 'express';

export type MiddlewareWrapper = ((router: Router) => void);

export const applyMiddleware = (middlewareWrappers: MiddlewareWrapper[], router: Router): void => {
    for(const wrapper of middlewareWrappers) wrapper(router);
}