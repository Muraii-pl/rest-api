import { DayOfWeekEnum } from '../../common/enums';

export interface ITrainingWithExercisesRaw {
  id: number,
  day_of_week: DayOfWeekEnum,
  is_recurrent: boolean,
  training_name: string,
  pause_after: string,
  pause_before: string;
  rights_series_qty: number,
  warmup_series_qty: number,
  pace: string;
  exercise_name: string,
  exercise_id:number,
  unit: string
}
