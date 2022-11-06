export interface DiscordMessage {
  message: {
    id: string,
    createdTimestamp: number,
    editedTimestamp: number,
    channelId: string,
    author: {
      id: string,
      username: string,
      discriminator: string,
      avatarUrl: string,
    },
    content: string,
    url: string,
  },
  channel: {
    id?: string,
    name?: string,
  },
  guild: {
    id?: string,
    name?: string,
  },
}
