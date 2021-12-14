import { Controller } from '@/application/protocols'

export const adaptResolver = async (controller: Controller, args: any): Promise<any> => {
  const httpResponse = await controller.handle(args)
  return httpResponse.body
}
