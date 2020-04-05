import Router from 'koa-router';
import Wechat from '../service/Wechat';

const router = new Router();

router.post('/api/login', async (ctx, next) => {
    // console.log(ctx.request.body);
    const loginReqData = ctx.request.body;
    const shareInfo = await Wechat.codeToSession(loginReqData);
    ctx.body = {
        ...shareInfo
    }
})

export default router;