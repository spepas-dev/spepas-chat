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
  res.status(StatusCodes.OK).json({ message: 'Rider buyer chat conversation', conversations });
};

const rbmessages = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const messages: IRBMessageDocument[] = await getRBMessages(senderId, receiverId);
  res.status(StatusCodes.OK).json({ message: 'Rider buyer chat messages', messages });
};

const rbconversationList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const messages: IRBMessageDocument[] = await getRBUserConversationList(userId);
  res.status(StatusCodes.OK).json({ message: 'Rider buyer conversation list', conversations: messages });
};

const rbuserMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IRBMessageDocument[] = await getRBUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ message: 'Rider buyer chat messages', messages });
};

const rsconversation = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const conversations: IConversationDocument[] = await getRSConversation(senderId, receiverId);
  res.status(StatusCodes.OK).json({ message: 'Rider seller chat conversation', conversations });
};

const rsmessages = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const messages: IRSMessageDocument[] = await getRSMessages(senderId, receiverId);
  res.status(StatusCodes.OK).json({ message: 'Rider seller chat messages', messages });
};

const rsconversationList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const messages: IRSMessageDocument[] = await getRSUserConversationList(userId);
  res.status(StatusCodes.OK).json({ message: 'Rider seller conversation list', conversations: messages });
};

const rsuserMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IRSMessageDocument[] = await getRSUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ message: 'Rider seller chat messages', messages });
};

const ucconversation = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const conversations: IConversationDocument[] = await getUCConversation(senderId, receiverId);
  res.status(StatusCodes.OK).json({ message: 'User customer service chat conversation', conversations });
};

const ucmessages = async (req: Request, res: Response): Promise<void> => {
  const { senderId, receiverId } = req.params;
  const messages: IUCMessageDocument[] = await getUCMessages(senderId, receiverId);
  res.status(StatusCodes.OK).json({ message: 'User customer service chat messages', messages });
};

const ucconversationList = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const messages: IUCMessageDocument[] = await getUCUserConversationList(userId);
  res.status(StatusCodes.OK).json({ message: 'User customer service conversation list', conversations: messages });
};

const ucuserMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IUCMessageDocument[] = await getUCUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ message: 'User customer service chat messages', messages });
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
