import { IConversationDocument } from '@chat/interfaces/chat.interface';
import { Model, Schema, model } from 'mongoose';

const conversationSchema: Schema = new Schema({
  conversationId: { type: String, required: true, unique: true, index: true },
  senderId: { type: String, required: true, index: true },
  senderName: { type: String, required: true, index: true },
  receiverId: { type: String, required: true, index: true },
  receiverName: { type: String, required: true, index: true }
});

const ConversationModel: Model<IConversationDocument> = model<IConversationDocument>('Conversation', conversationSchema, 'Conversation');
export { ConversationModel };
