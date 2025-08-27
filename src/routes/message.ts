// import { message } from '@chat/controllers/create';
// import { conversation, conversationList, messages, userMessages } from '@chat/controllers/get';
// import { markMultipleMessages, markSingleMessage, offer } from '@chat/controllers/update';
import { rbmessage, rsmessage, ucmessage } from '@chat/controllers/create';
import {
  rbconversation,
  rbconversationList,
  rbmessages,
  rbuserMessages,
  rsconversation,
  rsconversationList,
  rsmessages,
  rsuserMessages,
  ucconversation,
  ucconversationList,
  ucmessages,
  ucuserMessages
} from '@chat/controllers/get';
import {
  markMultipleRBMessages,
  markMultipleRSMessages,
  markMultipleUCMessages,
  markSingleRBMessage,
  markSingleRSMessage,
  markSingleUCMessage
} from '@chat/controllers/update';
import express, { Router } from 'express';

const router: Router = express.Router();

const messageRoutes = (): Router => {
  router.get('/rb/conversation/:senderId/:receiverId', rbconversation);
  router.get('/rb/conversations/:userId', rbconversationList);
  router.get('/rb/:senderId/:receiverId', rbmessages);
  router.get('/rb/:conversationId', rbuserMessages);
  router.post('/rb/', rbmessage);
  router.put('/rb/mark-as-read', markSingleRBMessage);
  router.put('/rb/mark-multiple-as-read', markMultipleRBMessages);

  router.get('/rs/conversation/:senderId/:receiverId', rsconversation);
  router.get('/rs/conversations/:userId', rsconversationList);
  router.get('/rs/:senderId/:receiverId', rsmessages);
  router.get('/rs/:conversationId', rsuserMessages);
  router.post('/rs/', rsmessage);
  router.put('/rs/mark-as-read', markSingleRSMessage);
  router.put('/rs/mark-multiple-as-read', markMultipleRSMessages);

  router.get('/uc/conversation/:senderId/:receiverId', ucconversation);
  router.get('/uc/conversations/:userId', ucconversationList);
  router.get('/uc/:senderId/:receiverId', ucmessages);
  router.get('/uc/:conversationId', ucuserMessages);
  router.post('/uc/', ucmessage);
  router.put('/uc/mark-as-read', markSingleUCMessage);
  router.put('/uc/mark-multiple-as-read', markMultipleUCMessages);

  return router;
};

export { messageRoutes };
