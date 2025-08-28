// import { getConversation, getMessages, getUserConversationList, getUserMessages } from '@chat/services/rbmessage.service';
// import { IConversationDocument, IMessageDocument } from '@josephboadi/joy-jobber-shared';
import { IConversationDocument, IRBMessageDocument, IRSMessageDocument, IUCMessageDocument } from '@chat/interfaces/chat.interface';
import { getRBConversation, getRBMessages, getRBUserConversationList, getRBUserMessages } from '@chat/services/rbmessage.service';
import { getRSConversation, getRSMessages, getRSUserConversationList, getRSUserMessages } from '@chat/services/rsmessage.service';
import { getUCConversation, getUCMessages, getUCUserConversationList, getUCUserMessages } from '@chat/services/ucmessage.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const rbconversation = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const conversations: IConversationDocument[] = await getRBConversation(senderId, receiverId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider buyer chat conversation', data: conversations });
};

const rbmessages = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const messages: IRBMessageDocument[] = await getRBMessages(senderId, receiverId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider buyer chat messages', data: messages });
};

const rbconversationList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const messages: IRBMessageDocument[] = await getRBUserConversationList(userId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider buyer conversation list', data: messages });
};

const rbuserMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IRBMessageDocument[] = await getRBUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider buyer chat messages', data: messages });
};

const rsconversation = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const conversations: IConversationDocument[] = await getRSConversation(senderId, receiverId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider seller chat conversation', data: conversations });
};

const rsmessages = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const messages: IRSMessageDocument[] = await getRSMessages(senderId, receiverId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider seller chat messages', data: messages });
};

const rsconversationList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const messages: IRSMessageDocument[] = await getRSUserConversationList(userId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider seller conversation list', data: messages });
};

const rsuserMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IRSMessageDocument[] = await getRSUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider seller chat messages', data: messages });
};

const ucconversation = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const conversations: IConversationDocument[] = await getUCConversation(senderId, receiverId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'User customer service chat conversation', data: conversations });
};

const ucmessages = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const messages: IUCMessageDocument[] = await getUCMessages(senderId, receiverId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'User customer service chat messages', data: messages });
};

const ucconversationList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const messages: IUCMessageDocument[] = await getUCUserConversationList(userId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'User customer service conversation list', data: messages });
};

const ucuserMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IUCMessageDocument[] = await getUCUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'User customer service chat messages', data: messages });
};

export {
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
};
