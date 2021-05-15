const BASE_URL = process.env.BASE_URL

export const state = () => ({
  mealPlanerInfo: {
    id: null,
    userId: undefined,
    date: '',
    targetProtein: 1,
    targetFats: 0.5,
    targetCarb: 2,
    targetWeight: 70,
    title: '',
    description: '',
    marks: [],
    socials: {
      like: null,
      dislike: null,
      repost: null
    },
    mealParts: [
      {
        title: 'Затрак',
        mealTime: '07:00',
        recipes: [],
        products: []
      },
    ]
  },
  selectedMealPart: 0,
  searchRecipesAndProductsModalActive: false,
})

export const getters = {
  getDayTargetKkal (state) {
    // targetKkalMale = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity
    // targetKkalFemale = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity

    // if (state.userGender === 'male') {
    //   let targetKkal = (88.36 + (13.4 * state.targetWeight) + (4.8 * state.userHeight) - (5.7 * state.userAge)) * state.userActivity
    //   return Math.round(targetKkal)
    // } else {
    //   lettargetKkal = (447.6 + (9.2 * state.targetWeight) + (3.1 * state.userHeight) - (4.3 * state.userAge)) * state.userActivity
    //   return Math.round(targetKkal)
    // }

    let currentKkal = (state.mealPlanerInfo.targetProtein * state.mealPlanerInfo.targetWeight * 4.1) + (state.mealPlanerInfo.targetFats * state.mealPlanerInfo.targetWeight * 9.3) + (state.mealPlanerInfo.targetCarb * state.mealPlanerInfo.targetWeight * 4.1)

    return Math.round(currentKkal)
  }
}

export const mutations = {
  setMealPlanerInfo (state, mealPlanerInfo) {
    state.mealPlanerInfo = mealPlanerInfo
  },
  setTargetNutrient (state, updatedNutrient) {
    state.mealPlanerInfo[updatedNutrient.field] = updatedNutrient.value
  },
  setTargetWeight (state, value) {
    state.mealPlanerInfo.targetWeight = value
  },
  setSearchRecipesAndProductsModalActive (state) {
    state.searchRecipesAndProductsModalActive = !state.searchRecipesAndProductsModalActive
  },
  setMealPlanMark (state, mark) {
    state.mealPlanerInfo.marks.push(mark)
  },
  removeMealPlanMark (state, markIndex) {
    state.mealPlanerInfo.marks.splice(markIndex, 1)
  },
  setMealPlanTitle (state, newValue) {
    state.mealPlanerInfo.title = newValue
  },
  setMealPlanDescription (state, newValue) {
    state.mealPlanerInfo.description = newValue
  },
  setSelectedMealPart (state, index) {
    state.selectedMealPart = index
  },
  addNewMealPart (state) {
    const emptyMealPart = {
      title: 'Новый прием пищи',
      mealTime: '00:00',
      recipes: [],
      products: []
    }
    state.mealPlanerInfo.mealParts.push(emptyMealPart)
    state.selectedMealPart = state.mealPlanerInfo.mealParts.length - 1
  },
  removeSelectedMealPart (state) {
    if (state.mealPlanerInfo.mealParts.length > 1) {
      state.mealPlanerInfo.mealParts.splice(state.selectedMealPart, 1)
      if (state.selectedMealPart !== 0) {
        state.selectedMealPart -= 1
      }
    }
  },
  setMealPartTime (state, newValue) {
    state.mealPlanerInfo.mealParts[state.selectedMealPart].mealTime = newValue
  },
  setMealPartTitle (state, newValue) {
    state.mealPlanerInfo.mealParts[state.selectedMealPart].title = newValue
  }
}

export const actions = {
  async fetchMealPlanerInfo ({ commit }, query ) {
    const url = `${BASE_URL}/api/meal-planer?date=${query.date ? query.date : ''}`

    try {
      const response = await this.$axios.$get(url)

      if (response.updatedToken) {
        this.commit('auth/setToken', response.updatedToken)
      }

      if (response.data.mealPlanerInfo !== false) {
        commit('setMealPlanerInfo', response.data.mealPlanerInfo)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
