import { MessagesModel, MessagesResponse } from './message-transformer.hook'

import { messages } from '../data'

export const useGetMessages = (): MessagesModel => {
  return {
    messages: new MessagesResponse(messages)
  }
}
