import { verifyAccessToken } from "../lib/token.js";

async function auth(ctx, next) {
    const token = ctx.request.headers["authorization"];
    const payload = verifyAccessToken(token);
    ctx.state.user = payload;
    await next();
}

export default auth;