export interface Message {
  text: string
  sentBy: string
  sentAt: Date
  isChatOwner?: boolean
}
