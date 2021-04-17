export default interface Task {
  /**
   * id: generated by uuid
   */
  id: string;
  /**
   * The name of the task
   */
  name: string;
  /**
   * false => one time thing
   * true => at regular intervals e.g daily or yearly
   */
  repeat: boolean;
  /**
   * The time it is going to happen, whether it's once or not
   */
  time: string;
  /**
   * The date that it will happen
   * For one time event
   */
  date: string;
  /**
   * For repetitive event
   */
  reminder: {
    /**
     * daily, weekly, monthly and yearly
     */
    type?: string;
    /**
     * For monthly and yearly events, between 1 to 31.
     */
    dateInMonth?: number;
    /**
     * For weekly events, 0 to 6
     * 0 = sun, 1 = mon etc
     */
    days?: number[];
    /**
     * For yearly events, 0 to 11,
     * 0 is jan, 1 is feb and 11 is dec
     */
    months?: number[]; // if it's year, the months
  };
  /**
   * like a tag, though it's is a string, each label should be separated by a string
   * e.g. "routine, daily, health" => 3 labels
   */
  labels: string;
  /**
   * Ranges from 1 to 5, based on level of importance
   */
  priority: number;
  /**
   * Ranges from 1(low) to 3(difficult), indicate how hard it is going to be
   */
  difficulty: number;
  /**
   * The name of the project it belongs to, used to group tasks together
   */
  project: string;
  /**
   * Keeps a record of all days an event is checked, ie. marked as done
   * It is saved as milliseconds, ie. Date.now(), based on the beginning of that date,
   * i.e. Date.getHours() = 0 and Date.getMinutes() = 0.
   */
  done: number[];
  /**
   * Keeps a record of all the time an even ran, ie. any time a countdown is completed
   * It saves using "t" + Date.now() as the key to indicate the time the task finished running and the value is how long the task ran. This may be used for some statistics
   */
  countdowns: { [key: string]: any };
  /**
   * Similar to countdowns, it keeps record of each points earned using "t" + Date.now() as key while value is the points accrued.
   */
  points: { [key: string]: any }; // keep all records of points earned, added when dropdown is completed or done is updated.
  showModal?: boolean;
}
