const mockRoute = require('./mock-routes');
const express = require('express');
const router = express.Router();
mockRoute.forEach(route => {
    const feeback = (req, res, next) => {
        const params = {...req.body, ...req.params, ...req.query};
        const result = route.response(params, req, res, next);
        console.info(`[${route.method}]`, route.path, params);
        console.info(`[Response] `, result);
        return result;
    };
    switch (route.method) {
        case 'get':
        router.get(route.path, (req, res, next) => res.send(feeback(req, res, next)));
            break;
        case 'post':
        router.post(route.path, (req, res, next) => res.send(feeback(req, res, next)));
            break;
        default:
            break;
    }
});

module.exports = router;
