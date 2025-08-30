import mongoose, { ObjectId } from 'mongoose';
export interface IConversationDocument extends Document {
  _id: mongoose.Types.ObjectId | string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
}

export interface IRBMessageDocument {
  _id?: string | ObjectId;
  conversationId?: string;
  body?: string;
  url?: string;
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  orderId?: string;
  riderId?: string;
  riderName?: string;
  buyerId?: string;
  buyerName?: string;
  senderId?: string;
  senderName?: string;
  senderPicture?: string;
  receiverId?: string;
  receiverName?: string;
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
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  orderId?: string;
  riderId?: string;
  riderName?: string;
  sellerId?: string;
  sellerName?: string;
  senderId?: string;
  senderName?: string;
  senderPicture?: string;
  receiverId?: string;
  receiverName?: string;
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
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  userId?: string;
  userName?: string;
  customerServiceId?: string;
  customerServiceName?: string;
  senderId?: string;
  senderName?: string;
  senderPicture?: string;
  receiverId?: string;
  receiverName?: string;
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
  name: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatBuyerProps {
  _id: string;
  userId: string;
  name: string;
  profilePicture: string;
}

export interface IChatSellerProps {
  _id: string;
  userId: string;
  name: string;
  profilePicture: string;
}

export interface IChatCustomerServiceProps {
  _id: string;
  userId: string;
  name: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatUserProps {
  _id: string;
  userId: string;
  name: string;
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
