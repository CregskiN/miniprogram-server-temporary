"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var login_1 = __importDefault(require("./routers/login"));
var app = new koa_1.default();
app.use(koa_bodyparser_1.default());
app.use(login_1.default.routes());
app.listen(8001, function () {
    console.log('listen port 8001...');
});
