import { formGenerator } from '@/utils/formGenerator'

export const state = () => ({
  trainingProgram: formGenerator({
    id: null,
    title: null,
    description: null,
    skill: null,
    image: null,
    marks: [],
    trainingProgramDays: [
      {
        id: null,
        title: 'День 1',
        comment: null,
        video: null,
        trainingProgramDayExercises: [
          // {
          //   approaches: "4-5",
          //   repeats: "10-12",
          //   additionalWeight: 12.2,
          //   implementationTime: null,
          //   restTime: null,
          //   exercise: {
          //     id: 1,
          //     title: "Отжимания"
          //   }
          // }
        ],
      },
    ],
    user: null
  }),
  selectedTrainingDay: 0,
})

export const getters = {}

export const mutations = {
  setTrainingProgram (state, payload) {
    for (const key in state.trainingProgram.fields) {
      state.trainingProgram.fields[key] = payload[key]
    }
  },
  setTrainingProgramFormFieldValue (state, ctx) {
    if (ctx.subfield && ctx.index >= 0) {
      state.trainingProgram.fields[ctx.field][ctx.index][ctx.subfield] = ctx.newValue
    } else {
      state.trainingProgram.fields[ctx.field] = ctx.newValue
    }
    state.trainingProgram.errors[ctx.field] = {
      enabled: false,
      errorMessage: null
    }
  },
  setTrainingProgramMark (state, text) {
    const mark = {
      id: null,
      title: text
    }
    state.trainingProgram.fields.marks.push(mark)
  },
  removeTrainingProgramMark (state, markIndex) {
    state.trainingProgram.fields.marks.splice(markIndex, 1)
  },
  setSelectedTrainingDay (state, index) {
    state.selectedTrainingDay = index
  },
  addTrainingProgramDay (state) {
    const trainingProgramDay = {
      id: null,
      title: `День ${state.trainingProgram.fields.trainingProgramDays.length + 1}`,
      description: null,
      video: null,
      exercises: [],
    }
    state.trainingProgram.fields.trainingProgramDays.push(trainingProgramDay)
    state.selectedTrainingDay = state.trainingProgram.fields.trainingProgramDays.length - 1
  },
  removeTrainingProgramDay (state) {
    if (state.trainingProgram.fields.trainingProgramDays.length > 1) {
      state.trainingProgram.fields.trainingProgramDays.splice(state.selectedTrainingDay, 1)
      if (state.selectedTrainingDay !== 0) {
        state.selectedTrainingDay -= 1
      }
    }
  },
}

export const actions = {
  async fetchTrainingProgram ({ commit }, trainingProgramId ) {
    try {
      const response = await this.$axios.$get(`${process.env.BASE_URL}/api/training-programs/${trainingProgramId}`)

      commit('setTrainingProgram', response.data)
    } catch (err) {
      console.log(err)

      const notice = {
        id: Date.now(),
        type: 'alert',
        message: 'Ошибка при загрузке данных для дневника тренировок. Обновите страницу или зайдите позже.',
        timeToShow: 5000,
        active: true
      }
      this.commit('notifications/addNewNotice', notice)
    }
  },
  async saveTrainingProgram ({ commit }, trainingProgram ) {
    try {
      console.log(trainingProgram)

      // const response = await this.$axios.$get(`${process.env.BASE_URL}/api/training-diary?date=${query.date ? query.date : ''}`)

      // commit('setTrainingDiaryInfo', response.data)
    } catch (err) {
      console.log(err)

      const notice = {
        id: Date.now(),
        type: 'alert',
        message: 'Ошибка при загрузке данных для дневника тренировок. Обновите страницу или зайдите позже.',
        timeToShow: 5000,
        active: true
      }
      this.commit('notifications/addNewNotice', notice)
    }
  },
}
