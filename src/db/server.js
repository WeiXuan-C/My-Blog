import jsonServer from 'json-server';  // 使用 'import' 代替 'require'
import { create } from 'json-server';  // 不再导入 'router'，避免重复声明

const server = create();
const router = jsonServer.router('db.json');  // 使用 jsonServer.router 创建路由
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 自定义中间件来验证 token
server.use((req, res, next) => {
    if (req.query.token) {
        const token = req.query.token;
        const users = router.db.get('users').value();

        // 查找匹配的 token
        const user = users.find(user => user.token === token);
        if (user) {
            return next(); // token 有效，继续执行后续操作
        } else {
            return res.status(401).json({ message: 'Invalid token' }); // token 无效，返回 401
        }
    } else {
        return res.status(401).json({ message: 'Token is required' }); // 没有 token，返回 401
    }
});

server.use(router);  // 使用路由
server.listen(5000, () => {
    console.log('JSON Server is running on http://localhost:5000');
});
