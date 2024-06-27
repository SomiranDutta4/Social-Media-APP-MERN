const express=require('express')
const messageRouter=express.Router()
const messageController=require('../controllers/messageController')

messageRouter.get('/user/mock',messageController.mockAPI)
messageRouter.get('/user/findAll',messageController.seeAll)
messageRouter.get('/user/findChat/',messageController.seeParticular)
messageRouter.post('/user/send/',messageController.sendMessage)
messageRouter.get('/user/search/',messageController.searchChat)

module.exports=messageRouter