import { IConversationDocument, IRBMessageDocument } from '@chat/interfaces/chat.interface';
import { ConversationModel } from '@chat/models/conversation.schema';
import { RBMessageModel } from '@chat/models/rbmessage.schema';
import { socketIOChatObject } from '@chat/server';

const createRBConversation = async (
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

const addRBMessage = async (data: IRBMessageDocument): Promise<IRBMessageDocument> => {
  const message: IRBMessageDocument = (await RBMessageModel.create(data)) as IRBMessageDocument;

  socketIOChatObject.emit('rider buyer message received', message);
  return message;
};

const getRBConversation = async (sender: string, receiver: string): Promise<IConversationDocument[]> => {
  const query = {
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  };
  const conversation: IConversationDocument[] = await ConversationModel.aggregate([{ $match: query }]);
  return conversation;
};

const getRBUserConversationList = async (userId: string): Promise<IRBMessageDocument[]> => {
  const query = {
    $or: [{ senderId: userId }, { receiverId: userId }]
  };
  const messages: IRBMessageDocument[] = await RBMessageModel.aggregate([
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
        buyerId: '$result.buyerId',
        buyerName: '$result.buyerName',
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

const getRBMessages = async (sender: string, receiver: string): Promise<IRBMessageDocument[]> => {
  const query = {
    $or: [
      { senderId: sender, receiverId: receiver },
      { senderId: receiver, receiverId: sender }
    ]
  };
  const messages: IRBMessageDocument[] = await RBMessageModel.aggregate([{ $match: query }, { $sort: { createdAt: 1 } }]);
  return messages;
};

const getRBUserMessages = async (messageConversationId: string): Promise<IRBMessageDocument[]> => {
  const messages: IRBMessageDocument[] = await RBMessageModel.aggregate([
    { $match: { conversationId: messageConversationId } },
    { $sort: { createdAt: 1 } }
  ]);
  return messages;
};

const markRBMessageAsRead = async (messageId: string): Promise<IRBMessageDocument> => {
  const message: IRBMessageDocument = (await RBMessageModel.findOneAndUpdate(
    { _id: messageId },
    {
      $set: {
        isRead: true
      }
    },
    { new: true }
  )) as IRBMessageDocument;
  socketIOChatObject.emit('rider buyer message updated', message);
  return message;
};

const markManyRBMessagesAsRead = async (receiver: string, sender: string, messageId: string): Promise<IRBMessageDocument> => {
  (await RBMessageModel.updateMany(
    { senderId: sender, receiverId: receiver, isRead: false },
    {
      $set: {
        isRead: true
      }
    }
  )) as IRBMessageDocument;
  const message: IRBMessageDocument = (await RBMessageModel.findOne({ _id: messageId }).exec()) as IRBMessageDocument;
  socketIOChatObject.emit('rider buyer message updated', message);
  return message;
};

export {
  addRBMessage,
  createRBConversation,
  getRBConversation,
  getRBMessages,
  getRBUserConversationList,
  getRBUserMessages,
  markManyRBMessagesAsRead,
  markRBMessageAsRead
};
