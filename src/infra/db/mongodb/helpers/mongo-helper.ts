import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map <T>(data: any): T {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mapCollection <T>(collection: any[]): T[] {
    return collection.map(data => MongoHelper.map(data))
  }
}
