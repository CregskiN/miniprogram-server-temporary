"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId;
    this.sessionKey = sessionKey;
}
WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = Buffer.from(this.sessionKey, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');
    try {
        // 解密
        var decipher = crypto_1.default.createDecipheriv('aes-128-cbc', sessionKey, iv);
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true);
        var decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        decoded = JSON.parse(decoded);
    }
    catch (err) {
        throw new Error('Illegal Buffer');
    }
    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer');
    }
    return decoded;
};
exports.default = WXBizDataCrypt;
