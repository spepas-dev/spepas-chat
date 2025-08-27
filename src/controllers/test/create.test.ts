/* eslint-disable @typescript-eslint/no-explicit-any */
// import { message } from '@chat/controllers/create';
import { authUserPayload, chatMockRequest, chatMockResponse, messageDocument } from '@chat/controllers/test/mocks/chat.mock';
import { rbmessageSchema } from '@chat/schemes/message';
// import { messageSchema } from '@chat/schemes/message';
import * as chatService from '@chat/services/rbmessage.service';
// import * as helper from '@josephboadi/joy-jobber-shared';
import { rbmessage } from '@chat/controllers/create';
import * as helper from '@chat/interfaces';
import { Request, Response } from 'express';

jest.mock('@chat/services/rbmessage.service');
jest.mock('@chat/interfaces');
jest.mock('@chat/schemes/message');
jest.mock('@elastic/elasticsearch');

describe('Chat Controller', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    delete messageDocument.hasConversationId;
    jest.clearAllMocks();
  });

  describe('message method', () => {
    it('should throw an error for invalid schema data', async () => {
      const req: Request = chatMockRequest({}, messageDocument, authUserPayload) as unknown as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(rbmessageSchema, 'validate').mockImplementation((): any =>
        Promise.resolve({
          error: {
            name: 'ValidationError',
            isJoi: true,
            details: [{ message: 'This is an error message' }]
          }
        })
      );

      rbmessage(req, res).catch(() => {
        expect(helper.BadRequestError).toHaveBeenCalledWith('This is an error message', 'Create rider buyer message() method');
      });
    });

    // it('should throw file upload error', async () => {
    //   const req: Request = chatMockRequest({}, messageDocument, authUserPayload) as unknown as Request;
    //   const res: Response = chatMockResponse();
    //   jest.spyOn(rbmessageSchema, 'validate').mockImplementation((): any => Promise.resolve({ error: {} }));
    //   // jest.spyOn(helper, 'uploads').mockImplementation((): any => Promise.resolve({ public_id: '' }));

    //   rbmessage(req, res).catch(() => {
    //     expect(BadRequestError).toHaveBeenCalledWith('File upload error. Try again', 'Create message() method');
    //   });
    // });

    it('should call createConversation method', async () => {
      messageDocument.hasConversationId = false;
      const req: Request = chatMockRequest({}, messageDocument, authUserPayload) as unknown as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(rbmessageSchema, 'validate').mockImplementation((): any => Promise.resolve({ error: {} }));
      // jest.spyOn(helper, 'uploads').mockImplementation((): any => Promise.resolve({ public_id: '123456' }));
      jest.spyOn(chatService, 'createRBConversation');

      await rbmessage(req, res);
      expect(chatService.createRBConversation).toHaveBeenCalledTimes(1);
    });

    it('should call addMessage method', async () => {
      messageDocument.hasConversationId = true;
      const req: Request = chatMockRequest({}, messageDocument, authUserPayload) as unknown as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(rbmessageSchema, 'validate').mockImplementation((): any => Promise.resolve({ error: {} }));
      // jest.spyOn(helper, 'uploads').mockImplementation((): any => Promise.resolve({ public_id: '123456' }));
      jest.spyOn(chatService, 'addRBMessage');

      await rbmessage(req, res);
      expect(chatService.addRBMessage).toHaveBeenCalledTimes(1);
    });

    it('should return correct json response', async () => {
      const req: Request = chatMockRequest({}, messageDocument, authUserPayload) as unknown as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(rbmessageSchema, 'validate').mockImplementation((): any => Promise.resolve({ error: {} }));
      // jest.spyOn(helper, 'uploads').mockImplementation((): any => Promise.resolve({ public_id: '123456' }));

      await rbmessage(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Rider Buyer Message added',
        conversationId: messageDocument.conversationId,
        messageData: messageDocument
      });
    });
  });
});
