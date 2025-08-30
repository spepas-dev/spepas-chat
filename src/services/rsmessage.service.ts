import { IConversationDocument, IRSMessageDocument } from '@chat/interfaces/chat.interface';
import { ConversationModel } from '@chat/models/conversation.schema';
import { RSMessageModel } from '@chat/models/rsmessage.schema';
import { socketIOChatObject } from '@chat/server';

const createRSConversation = async (
  conversationId: string,
  senderId: string,
  receiverId: string,
  senderName: string,
  receiverName: string
): Promise<void> => {
  await ConversationModel.create({
    conversationId,
    senderId,
    senderName,
    receiverId,
    receiverName
  });
};

const addRSMessage = async (data: IRSMessageDocument): Promise<IRSMessageDocument> => {
  const message: IRSMessageDocument = (await RSMessageModel.create(data)) as IRSMessageDocument;

  socketIOChatObject.emit('rider seller message received', message);
  return message;
};

const getRSConversation = async (sender: string, receiver: string): Promise<IConversationDocument[]> => {
  const query = {
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  };
  const conversation: IConversationDocument[] = await ConversationModel.aggregate([{ $match: query }]);
  return conversation;
};

const getRSUserConversationList = async (userId: string): Promise<IRSMessageDocument[]> => {
  const query = {
    $or: [{ senderId: userId }, { receiverId: userId }]
  };
  const messages: IRSMessageDocument[] = await RSMessageModel.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$conversationId',
        result: { $top: { output: '$$ROOT', sortBy: { createdAt: -1 } } }
      }
    },
    {
      $project: {
        _id: '$result._id',
        conversationId: '$result.conversationId',
        riderId: '$result.riderId',
        riderName: '$result.riderName',
        sellerId: '$result.sellerId',
        sellerName: '$result.sellerName',
        receiverId: '$result.receiverId',
        receiverName: '$result.receiverName',
        receiverPicture: '$result.receiverPicture',
        senderId: '$result.senderId',
        senderName: '$result.senderName',
        senderPicture: '$result.senderPicture',
        body: '$result.body',
        file: '$result.file',
        orderId: '$result.orderId',
        isRead: '$result.isRead',
        createdAt: '$result.createdAt'
      }
    }
  ]);
  return messages;
};

const getRSMessages = async (sender: string, receiver: string): Promise<IRSMessageDocument[]> => {
  const query = {
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  };
  const messages: IRSMessageDocument[] = await RSMessageModel.aggregate([{ $match: query }, { $sort: { createdAt: 1 } }]);
  return messages;
};

const getRSUserMessages = async (messageConversationId: string): Promise<IRSMessageDocument[]> => {
  const messages: IRSMessageDocument[] = await RSMessageModel.aggregate([
    { $match: { conversationId: messageConversationId } },
    { $sort: { createdAt: 1 } }
  ]);
  return messages;
};

const markRSMessageAsRead = async (messageId: string): Promise<IRSMessageDocument> => {
  const message: IRSMessageDocument = (await RSMessageModel.findOneAndUpdate(
    { _id: messageId },
    {
      $set: {
        isRead: true
      }
    },
    { new: true }
  )) as IRSMessageDocument;
  socketIOChatObject.emit('rider seller message updated', message);
  return message;
};

const markManyRSMessagesAsRead = async (receiver: string, sender: string, messageId: string): Promise<IRSMessageDocument> => {
  (await RSMessageModel.updateMany(
    { senderId: sender, receiverId: receiver, isRead: false },
    {
      $set: {
        isRead: true
      }
    }
  )) as IRSMessageDocument;
  const message: IRSMessageDocument = (await RSMessageModel.findOne({ _id: messageId }).exec()) as IRSMessageDocument;
  socketIOChatObject.emit('rider seller message updated', message);
  return message;
};

export {
  addRSMessage,
  createRSConversation,
  getRSConversation,
  getRSMessages,
  getRSUserConversationList,
  getRSUserMessages,
  markManyRSMessagesAsRead,
  markRSMessageAsRead
};
