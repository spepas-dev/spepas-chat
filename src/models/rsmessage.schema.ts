import { IRSMessageDocument } from '@chat/interfaces/chat.interface';
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
    orderId: { type: String, default: '' },
    sellerId: { type: String, required: true },
    sellerName: { type: String, required: true },
    riderId: { type: String, required: true },
    riderName: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

const RSMessageModel: Model<IRSMessageDocument> = model<IRSMessageDocument>('RSMessage', messageSchema, 'RSMessage');
export { RSMessageModel };
