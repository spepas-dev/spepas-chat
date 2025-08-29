// import crypto from 'crypto';

// import { messageSchema } from '@chat/schemes/message';
// import { addMessage, createConversation } from '@chat/services/rbmessage.service';
// import { BadRequestError, IMessageDocument, uploads } from '@josephboadi/joy-jobber-shared';
import { BadRequestError } from '@chat/interfaces';
import { IRBMessageDocument, IRSMessageDocument, IUCMessageDocument } from '@chat/interfaces/chat.interface';
import { rbmessageSchema, rsmessageSchema, ucmessageSchema } from '@chat/schemes/message';
import { addRBMessage, createRBConversation } from '@chat/services/rbmessage.service';
// import { UploadApiResponse } from 'cloudinary';
import { addRSMessage, createRSConversation } from '@chat/services/rsmessage.service';
import { addUCMessage, createUCConversation } from '@chat/services/ucmessage.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const rbmessage = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(rbmessageSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create rider buyer message() method');
  }
  // let file: string = req.body.file;
  // const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  // const randomCharacters: string = randomBytes.toString('hex');
  // let result: UploadApiResponse;
  // if (file) {
  //   result = (req.body.fileType === 'zip' ? await uploads(file, `${randomCharacters}.zip`) : await uploads(file)) as UploadApiResponse;
  //   if (!result.public_id) {
  //     throw new BadRequestError('File upload error. Try again', 'Create message() method');
  //   }
  //   file = result?.secure_url;
  // }
  const messageData: IRBMessageDocument = {
    conversationId: req.body.conversationId,
    body: req.body.body,
    // file,
    // fileType: req.body.fileType,
    // fileSize: req.body.fileSize,
    // fileName: req.body.fileName,
    orderId: req.body.orderId,
    buyerId: req.body.buyerId,
    buyerName: req.body.buyerName,
    riderId: req.body.riderId,
    riderName: req.body.riderName,
    senderId: req.body.senderId,
    senderName: req.body.senderName,
    senderPicture: req.body.senderPicture,
    receiverId: req.body.receiverId,
    receiverName: req.body.receiverName,
    receiverPicture: req.body.receiverPicture,
    isRead: req.body.isRead
  };
  if (!req.body.hasConversationId) {
    await createRBConversation(
      `${messageData.conversationId}`,
      `${messageData.senderId}`,
      `${messageData.receiverId}`,
      `${messageData.senderName}`,
      `${messageData.receiverName}`
    );
  }
  await addRBMessage(messageData);
  res
    .status(StatusCodes.OK)
    .json({ status: 1, message: 'Rider Buyer Message added', conversationId: req.body.conversationId, data: messageData });
};

const rsmessage = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(rsmessageSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create rider seller message() method');
  }
  // let file: string = req.body.file;
  // const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  // const randomCharacters: string = randomBytes.toString('hex');
  // let result: UploadApiResponse;
  // if (file) {
  //   result = (req.body.fileType === 'zip' ? await uploads(file, `${randomCharacters}.zip`) : await uploads(file)) as UploadApiResponse;
  //   if (!result.public_id) {
  //     throw new BadRequestError('File upload error. Try again', 'Create message() method');
  //   }
  //   file = result?.secure_url;
  // }
  const messageData: IRSMessageDocument = {
    conversationId: req.body.conversationId,
    body: req.body.body,
    // file,
    // fileType: req.body.fileType,
    // fileSize: req.body.fileSize,
    // fileName: req.body.fileName,
    orderId: req.body.orderId,
    sellerId: req.body.sellerId,
    sellerName: req.body.sellerName,
    riderId: req.body.riderId,
    riderName: req.body.riderName,
    senderId: req.body.senderId,
    senderName: req.body.senderName,
    senderPicture: req.body.senderPicture,
    receiverId: req.body.receiverId,
    receiverName: req.body.receiverName,
    receiverPicture: req.body.receiverPicture,
    isRead: req.body.isRead
  };
  if (!req.body.hasConversationId) {
    await createRSConversation(
      `${messageData.conversationId}`,
      `${messageData.senderId}`,
      `${messageData.receiverId}`,
      `${messageData.senderName}`,
      `${messageData.receiverName}`
    );
  }
  await addRSMessage(messageData);
  res
    .status(StatusCodes.OK)
    .json({ status: 1, message: 'Rider Seller Message added', conversationId: req.body.conversationId, data: messageData });
};

const ucmessage = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(ucmessageSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create user customer service message() method');
  }
  // let file: string = req.body.file;
  // const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  // const randomCharacters: string = randomBytes.toString('hex');
  // let result: UploadApiResponse;
  // if (file) {
  //   result = (req.body.fileType === 'zip' ? await uploads(file, `${randomCharacters}.zip`) : await uploads(file)) as UploadApiResponse;
  //   if (!result.public_id) {
  //     throw new BadRequestError('File upload error. Try again', 'Create message() method');
  //   }
  //   file = result?.secure_url;
  // }
  const messageData: IUCMessageDocument = {
    conversationId: req.body.conversationId,
    body: req.body.body,
    // file,
    // fileType: req.body.fileType,
    // fileSize: req.body.fileSize,
    // fileName: req.body.fileName,
    userId: req.body.sellerId,
    userName: req.body.sellerName,
    customerServiceId: req.body.customerServiceId,
    customerServiceName: req.body.customerServiceName,
    senderId: req.body.senderId,
    senderName: req.body.senderName,
    senderPicture: req.body.senderPicture,
    receiverId: req.body.receiverId,
    receiverName: req.body.receiverName,
    receiverPicture: req.body.receiverPicture,
    isRead: req.body.isRead
  };
  if (!req.body.hasConversationId) {
    await createUCConversation(
      `${messageData.conversationId}`,
      `${messageData.senderId}`,
      `${messageData.receiverId}`,
      `${messageData.senderName}`,
      `${messageData.receiverName}`
    );
  }
  await addUCMessage(messageData);
  res
    .status(StatusCodes.OK)
    .json({ status: 1, message: 'User Customer Service Message added', conversationId: req.body.conversationId, data: messageData });
};

export { rbmessage, rsmessage, ucmessage };
