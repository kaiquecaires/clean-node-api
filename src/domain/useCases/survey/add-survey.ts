export interface AddSurvey {
  add: (account: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey {
  export type Params = {
    question: string
    answers: SurveyAnswerModel[]
    date: Date
    didAnswer?: boolean
  }

  type SurveyAnswerModel = {
    image?: string
    answer: string
  }
}
