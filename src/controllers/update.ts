// import { markManyMessagesAsRead, markMessageAsRead, updateOffer } from '@chat/services/rbmessage.service';
// import { IMessageDocument } from '@josephboadi/joy-jobber-shared';
import { IRBMessageDocument, IRSMessageDocument, IUCMessageDocument } from '@chat/interfaces/chat.interface';
import { markManyRBMessagesAsRead, markRBMessageAsRead } from '@chat/services/rbmessage.service';
import { markManyRSMessagesAsRead, markRSMessageAsRead } from '@chat/services/rsmessage.service';
import { markManyUCMessagesAsRead, markUCMessageAsRead } from '@chat/services/ucmessage.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const markMultipleRBMessages = async (req: Request, res: Response): Promise<void> => {
  const { messageId, senderId, receiverId } = req.body;
  await markManyRBMessagesAsRead(receiverId, senderId, messageId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider buyer messages marked as read' });
};

const markSingleRBMessage = async (req: Request, res: Response): Promise<void> => {
  const { messageId } = req.body;
  const message: IRBMessageDocument = await markRBMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider buyer Message marked as read', data: message });
};

const markMultipleRSMessages = async (req: Request, res: Response): Promise<void> => {
  const { messageId, senderId, receiverId } = req.body;
  await markManyRSMessagesAsRead(receiverId, senderId, messageId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider seller messages marked as read' });
};

const markSingleRSMessage = async (req: Request, res: Response): Promise<void> => {
  const { messageId } = req.body;
  const message: IRSMessageDocument = await markRSMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'Rider seller Message marked as read', data: message });
};

const markMultipleUCMessages = async (req: Request, res: Response): Promise<void> => {
  const { messageId, senderId, receiverId } = req.body;
  await markManyUCMessagesAsRead(receiverId, senderId, messageId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'User customer service messages marked as read' });
};

const markSingleUCMessage = async (req: Request, res: Response): Promise<void> => {
  const { messageId } = req.body;
  const message: IUCMessageDocument = await markUCMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({ status: 1, message: 'User customer service Message marked as read', data: message });
};

export {
  markMultipleRBMessages,
  markMultipleRSMessages,
  markMultipleUCMessages,
  markSingleRBMessage,
  markSingleRSMessage,
  markSingleUCMessage
};
