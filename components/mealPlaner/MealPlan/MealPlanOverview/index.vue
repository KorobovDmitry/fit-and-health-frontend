<template>
  <div class="meal-plan-overview">
    <div class="meal-plan-overview__content">
      <nutrients-settings />

      <div class="overview">
        <div class="title-description-marks">
          <div class="title-and-description">
            <overview-title />
            <overview-description />
          </div>

          <added-marks
            :marks="marks"
            @addMark="setMealPlanMark($event)"
            @removeMark="removeMealPlanMark($event)"
          />
        </div>

        <nutrients-calculations />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import OverviewTitle from '@/components/mealPlaner/MealPlan/MealPlanOverview/OverviewTitle'
import NutrientsSettings from '@/components/mealPlaner/MealPlan/MealPlanOverview/NutrientsSettings'
import OverviewDescription from '@/components/mealPlaner/MealPlan/MealPlanOverview/OverviewDescription'
import AddedMarks from '@/components/mealPlaner/MealPlan/MealPlanOverview/AddedMarks'
import NutrientsCalculations from '@/components/mealPlaner/MealPlan/MealPlanOverview/NutrientsCalculations'

export default {
  components: {
    OverviewTitle,
    NutrientsSettings,
    OverviewDescription,
    AddedMarks,
    NutrientsCalculations,
  },
  computed: {
    ...mapState({
      marks: state => state.mealPlaner.mealPlanerInfo.marks
    })
  },
  methods: {
    ...mapMutations({
      setMealPlanMark: 'mealPlaner/setMealPlanMark',
      removeMealPlanMark: 'mealPlaner/removeMealPlanMark'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/vars.scss";

.meal-plan-overview {
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-bottom: 1px solid $dividerBorder;
  .meal-plan-overview__content {
    display: flex;
    .overview {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      .title-description-marks {
        flex: 1 1 auto;
        display: flex;
        padding-right: 10px;
        padding-bottom: 10px;
        .title-and-description {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}

</style>
