import Joi, { ObjectSchema } from 'joi';

const rbmessageSchema: ObjectSchema = Joi.object().keys({
  conversationId: Joi.string().optional().allow(null, ''),
  _id: Joi.string().optional(),
  body: Joi.string().optional().allow(null, ''),
  hasConversationId: Joi.boolean().optional(), // this is only for checking if conversation id exist
  // file: Joi.string().optional().allow(null, ''),
  // fileType: Joi.string().optional().allow(null, ''),
  // fileName: Joi.string().optional().allow(null, ''),
  // fileSize: Joi.string().optional().allow(null, ''),
  orderId: Joi.string().optional().allow(null, ''),
  riderId: Joi.string().required().messages({
    'string.base': 'Rider id is required',
    'string.empty': 'Rider id is required',
    'any.required': 'Rider id is required'
  }),
  buyerId: Joi.string().required().messages({
    'string.base': 'Buyer id is required',
    'string.empty': 'Buyer id is required',
    'any.required': 'Buyer id is required'
  }),
  senderId: Joi.string().required().messages({
    'string.base': 'Sender id is required',
    'string.empty': 'Sender id is required',
    'any.required': 'Sender id is required'
  }),
  senderPicture: Joi.string().required().messages({
    'string.base': 'Sender picture is required',
    'string.empty': 'Sender picture is required',
    'any.required': 'Sender picture is required'
  }),
  receiverId: Joi.string().required().messages({
    'string.base': 'Receiver id is required',
    'string.empty': 'Receiver id is required',
    'any.required': 'Receiver id is required'
  }),
  receiverPicture: Joi.string().required().messages({
    'string.base': 'Receiver picture is required',
    'string.empty': 'Receiver picture is required',
    'any.required': 'Receiver picture is required'
  }),
  isRead: Joi.boolean().optional(),
  createdAt: Joi.string().optional()
});

const rsmessageSchema: ObjectSchema = Joi.object().keys({
  conversationId: Joi.string().optional().allow(null, ''),
  _id: Joi.string().optional(),
  body: Joi.string().optional().allow(null, ''),
  hasConversationId: Joi.boolean().optional(), // this is only for checking if conversation id exist
  // file: Joi.string().optional().allow(null, ''),
  // fileType: Joi.string().optional().allow(null, ''),
  // fileName: Joi.string().optional().allow(null, ''),
  // fileSize: Joi.string().optional().allow(null, ''),
  orderId: Joi.string().optional().allow(null, ''),
  riderId: Joi.string().required().messages({
    'string.base': 'Rider id is required',
    'string.empty': 'Rider id is required',
    'any.required': 'Rider id is required'
  }),
  sellerId: Joi.string().required().messages({
    'string.base': 'Seller id is required',
    'string.empty': 'Seller id is required',
    'any.required': 'Seller id is required'
  }),
  senderId: Joi.string().required().messages({
    'string.base': 'Sender id is required',
    'string.empty': 'Sender id is required',
    'any.required': 'Sender id is required'
  }),
  senderPicture: Joi.string().required().messages({
    'string.base': 'Sender picture is required',
    'string.empty': 'Sender picture is required',
    'any.required': 'Sender picture is required'
  }),
  receiverId: Joi.string().required().messages({
    'string.base': 'Receiver id is required',
    'string.empty': 'Receiver id is required',
    'any.required': 'Receiver id is required'
  }),
  receiverPicture: Joi.string().required().messages({
    'string.base': 'Receiver picture is required',
    'string.empty': 'Receiver picture is required',
    'any.required': 'Receiver picture is required'
  }),
  isRead: Joi.boolean().optional(),
  createdAt: Joi.string().optional()
});

const ucmessageSchema: ObjectSchema = Joi.object().keys({
  conversationId: Joi.string().optional().allow(null, ''),
  _id: Joi.string().optional(),
  body: Joi.string().optional().allow(null, ''),
  hasConversationId: Joi.boolean().optional(), // this is only for checking if conversation id exist
  // file: Joi.string().optional().allow(null, ''),
  // fileType: Joi.string().optional().allow(null, ''),
  // fileName: Joi.string().optional().allow(null, ''),
  // fileSize: Joi.string().optional().allow(null, ''),
  customerServiceId: Joi.string().required().messages({
    'string.base': 'Customer Service id is required',
    'string.empty': 'Customer Service id is required',
    'any.required': 'Customer Service id is required'
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User id is required',
    'string.empty': 'User id is required',
    'any.required': 'User id is required'
  }),
  senderId: Joi.string().required().messages({
    'string.base': 'Sender id is required',
    'string.empty': 'Sender id is required',
    'any.required': 'Sender id is required'
  }),
  senderPicture: Joi.string().required().messages({
    'string.base': 'Sender picture is required',
    'string.empty': 'Sender picture is required',
    'any.required': 'Sender picture is required'
  }),
  receiverId: Joi.string().required().messages({
    'string.base': 'Receiver id is required',
    'string.empty': 'Receiver id is required',
    'any.required': 'Receiver id is required'
  }),
  receiverPicture: Joi.string().required().messages({
    'string.base': 'Receiver picture is required',
    'string.empty': 'Receiver picture is required',
    'any.required': 'Receiver picture is required'
  }),
  isRead: Joi.boolean().optional(),
  createdAt: Joi.string().optional()
});

export { rbmessageSchema, rsmessageSchema, ucmessageSchema };
