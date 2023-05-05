export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export default interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user";