import MockDate from 'mockdate'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey-result'
import { mockSurveyResultModel, mockEmptySurveyResultModel } from '@/domain/test'
import { mockLoadSurveyByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null)
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null)
    const surveyResultModel = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResultModel).toEqual(mockEmptySurveyResultModel())
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.load('any_survey_id', 'any_account_id')
    await expect(promise).rejects.toThrow()
  })
})
