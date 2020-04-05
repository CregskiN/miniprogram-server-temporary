import Koa from 'koa';
import parser from 'koa-bodyparser';
import login from './routers/login';
const app = new Koa();


app.use(parser());

app.use(login.routes());

app.listen(8001, () => {
    console.log('listen port 8001...');
})
