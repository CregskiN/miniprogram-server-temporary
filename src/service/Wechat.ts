import axios from 'axios';

import config from '../config/config';
import WXBizDataCrypt from '../utils/WXBizDataCrypt';

interface LoginReqData {
    code: string;
    appId: string;
    encryptedData: string;
    iv: string;
}


class Wechat {

    static async codeToSession(data: LoginReqData) {
        const { appId, encryptedData, code, iv } = data;
        try {
            const res = await axios({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: 'GET',
                params: {
                    appid: config.app.appID,
                    secret: config.app.appSecret,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            });
            const { session_key } = res.data;
            var pc = new WXBizDataCrypt(appId, session_key)
            var shareInfo: Object = pc.decryptData(encryptedData, iv);
            return shareInfo;
        } catch(err){
            console.log(err);
            return {};
        }

    }
}

export default Wechat;