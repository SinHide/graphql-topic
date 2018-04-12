export const typeDefs = `
  type Channel = {
    id: ID!   # !: 必填
    name: String
  }

  # 此类型指定了我们的 API 的入口点。在本例中，只有一个 channels 返回列表。
  type Query = {
    channels: [Channel]
  }
`;