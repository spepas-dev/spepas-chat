import { IUCMessageDocument } from '@chat/interfaces/chat.interface';
import { Model, Schema, model } from 'mongoose';

const messageSchema: Schema = new Schema(
  {
    conversationId: { type: String, required: true, index: true },
    senderId: { type: String, required: true, index: true },
    senderName: { type: String, required: true, index: true },
    receiverId: { type: String, required: true, index: true },
    receiverName: { type: String, required: true, index: true },
    // senderPicture: { type: String, required: true },
    senderPicture: { type: String, default: '' },
    // receiverPicture: { type: String, required: true },
    receiverPicture: { type: String, default: '' },
    body: { type: String, default: '' },
    file: { type: String, default: '' },
    fileType: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    fileName: { type: String, default: '' },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    customerServiceId: { type: String, required: true },
    customerServiceName: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

const UCMessageModel: Model<IUCMessageDocument> = model<IUCMessageDocument>('UCMessage', messageSchema, 'UCMessage');
export { UCMessageModel };
