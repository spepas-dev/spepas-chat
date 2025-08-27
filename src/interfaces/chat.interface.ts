import mongoose, { ObjectId } from 'mongoose';
// import { IOffer } from './order.interface';
// import { ISellerGig } from './gig.interface';
// import { ISellerDocument } from './seller.interface';

export interface IConversationDocument extends Document {
  _id: mongoose.Types.ObjectId | string;
  conversationId: string;
  senderId: string;
  receiverId: string;
}

export interface IRBMessageDocument {
  _id?: string | ObjectId;
  conversationId?: string;
  body?: string;
  url?: string;
  // file?: string;
  // fileType?: string;
  // fileSize?: string;
  // fileName?: string;
  orderId?: string;
  riderId?: string;
  buyerId?: string;
  senderId?: string;
  senderPicture?: string;
  receiverId?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export interface IRSMessageDocument {
  _id?: string | ObjectId;
  conversationId?: string;
  body?: string;
  url?: string;
  // file?: string;
  // fileType?: string;
  // fileSize?: string;
  // fileName?: string;
  orderId?: string;
  riderId?: string;
  sellerId?: string;
  senderId?: string;
  senderPicture?: string;
  receiverId?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export interface IUCMessageDocument {
  _id?: string | ObjectId;
  conversationId?: string;
  body?: string;
  url?: string;
  // file?: string;
  // fileType?: string;
  // fileSize?: string;
  // fileName?: string;
  userId?: string;
  customerServiceId?: string;
  senderId?: string;
  senderPicture?: string;
  receiverId?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export interface IRBChatBoxProps {
  rider: IChatRiderProps;
  buyer: IChatBuyerProps;
  orderId: string;
  onClose: () => void;
}

export interface IRSChatBoxProps {
  rider: IChatRiderProps;
  seller: IChatSellerProps;
  orderId: string;
  onClose: () => void;
}

export interface IUCChatBoxProps {
  user: IChatUserProps;
  customerservice: IChatCustomerServiceProps;
  onClose: () => void;
}

export interface IChatRiderProps {
  _id: string;
  userId: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatBuyerProps {
  _id: string;
  userId: string;
  profilePicture: string;
}

export interface IChatSellerProps {
  _id: string;
  userId: string;
  profilePicture: string;
}

export interface IChatCustomerServiceProps {
  _id: string;
  userId: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatUserProps {
  _id: string;
  userId: string;
  profilePicture: string;
}

export interface IRBChatMessageProps {
  message: IRBMessageDocument;
  rider?: unknown;
  order?: unknown;
}

export interface IRSChatMessageProps {
  message: IRSMessageDocument;
  rider?: unknown;
  order?: unknown;
}

export interface IUCChatMessageProps {
  message: IUCMessageDocument;
  customerservice?: unknown;
}
