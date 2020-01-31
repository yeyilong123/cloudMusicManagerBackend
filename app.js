const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const ENV = 'test-yezi-test'
const koaBody = require('koa-body')

app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))

app.use(koaBody({
    multipart: true,
}))

app.use(async (ctx, next)=>{
    // ctx.body = 'hello'
    ctx.state.env = ENV
    await next()
})

const playlist = require('./controller/playlist.js')
const swiper = require('./controller/swiper.js')
const blog = require('./controller/blog.js')

router.use('/playlist', playlist.routes())
router.use('/swiper', swiper.routes())
router.use('/blog', blog.routes())

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3000, ()=>{
    console.log('开启3000')
})