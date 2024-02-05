import { DayOfWeekEnum } from '../../common/enums';

export interface ITrainingWithExercisesRaw {
  id: number,
  day_of_week: DayOfWeekEnum,
  is_recurrent: boolean,
  training_name: string,
  pause: string,
  exercise_name: string,
  unit: string
}
