import { Message } from '../types'

export const messages: Message[] = [
  {
    text: 'cậu ăn cơm chưa!',
    sentBy: 'đặng thị hồng ...',
    sentAt: new Date('2023-03-02T09:00:00Z'),
    isChatOwner: true
  },
  {
    text: 'tớ chưa!',
    sentBy: 'hưng',
    sentAt: new Date('2023-03-02T09:01:00Z'),
    isChatOwner: false
  },
  {
    text: 'cậu ăn cơm với gì?',
    sentBy: 'khách hàng',
    sentAt: new Date('2023-03-02T09:02:00Z'),
    isChatOwner: true
  },
  {
    text: 'tớ!',
    sentBy: 'hưng đẹp trai',
    sentAt: new Date('2023-03-02T09:03:00Z'),
    isChatOwner: false
  }
]
