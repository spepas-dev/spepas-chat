import { IConversationDocument, IUCMessageDocument } from '@chat/interfaces/chat.interface';
import { ConversationModel } from '@chat/models/conversation.schema';
import { UCMessageModel } from '@chat/models/ucmessage.schema';
import { socketIOChatObject } from '@chat/server';

const createUCConversation = async (
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

const addUCMessage = async (data: IUCMessageDocument): Promise<IUCMessageDocument> => {
  const message: IUCMessageDocument = (await UCMessageModel.create(data)) as IUCMessageDocument;

  socketIOChatObject.emit('user customer service message received', message);
  return message;
};

const getUCConversation = async (sender: string, receiver: string): Promise<IConversationDocument[]> => {
  const query = {
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  };
  const conversation: IConversationDocument[] = await ConversationModel.aggregate([{ $match: query }]);
  return conversation;
};

const getUCUserConversationList = async (userId: string): Promise<IUCMessageDocument[]> => {
  const query = {
    $or: [{ senderId: userId }, { receiverId: userId }]
  };
  const messages: IUCMessageDocument[] = await UCMessageModel.aggregate([
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
        customerServiceId: '$result.customerServiceId',
        customerServiceName: '$result.customerServiceName',
        userId: '$result.buyerId',
        userName: '$result.buyerName',
        receiverId: '$result.receiverId',
        receiverName: '$result.receiverName',
        receiverPicture: '$result.receiverPicture',
        senderId: '$result.senderId',
        senderName: '$result.senderName',
        senderPicture: '$result.senderPicture',
        body: '$result.body',
        // file: '$result.file',
        isRead: '$result.isRead',
        createdAt: '$result.createdAt'
      }
    }
  ]);
  return messages;
};

const getUCMessages = async (sender: string, receiver: string): Promise<IUCMessageDocument[]> => {
  const query = {
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  };
  const messages: IUCMessageDocument[] = await UCMessageModel.aggregate([{ $match: query }, { $sort: { createdAt: 1 } }]);
  return messages;
};

const getUCUserMessages = async (messageConversationId: string): Promise<IUCMessageDocument[]> => {
  const messages: IUCMessageDocument[] = await UCMessageModel.aggregate([
    { $match: { conversationId: messageConversationId } },
    { $sort: { createdAt: 1 } }
  ]);
  return messages;
};

const markUCMessageAsRead = async (messageId: string): Promise<IUCMessageDocument> => {
  const message: IUCMessageDocument = (await UCMessageModel.findOneAndUpdate(
    { _id: messageId },
    {
      $set: {
        isRead: true
      }
    },
    { new: true }
  )) as IUCMessageDocument;
  socketIOChatObject.emit('user customer service message updated', message);
  return message;
};

const markManyUCMessagesAsRead = async (receiver: string, sender: string, messageId: string): Promise<IUCMessageDocument> => {
  (await UCMessageModel.updateMany(
    { senderId: sender, receiverId: receiver, isRead: false },
    {
      $set: {
        isRead: true
      }
    }
  )) as IUCMessageDocument;
  const message: IUCMessageDocument = (await UCMessageModel.findOne({ _id: messageId }).exec()) as IUCMessageDocument;
  socketIOChatObject.emit('user customer service message updated', message);
  return message;
};

export {
  addUCMessage,
  createUCConversation,
  getUCConversation,
  getUCMessages,
  getUCUserConversationList,
  getUCUserMessages,
  markManyUCMessagesAsRead,
  markUCMessageAsRead
};
