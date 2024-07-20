export enum Frequency {
    Monthly = 1,
    Yearly = 2,
  }
  
  export enum Type {
    Ongoing = 1,
    Single = 2,
  }
  
  export enum OperationType {
    ReminderCreated = 1,
    ReminderUpdated = 2,
    ReminderDeleted = 3,
  }
  
  export type ReminderHistoryRecord = {
    id: number;
    userId: number;
    reminderId: number;
    startedAt: Date;
    categoryId: number;
    frequency: Frequency; // cant be changed
    cost: number;
    operationType: OperationType;
    type: Type; // cant be changed
    autoRenewal: boolean;
  };
  
  export type ReminderHistory = {
    startDate: Date;
    endDate: Date;
    categoryId: number;
  };
  
  export enum TimeInterval {
    Monthly = 1,
    Yearly = 2,
  }
  
  const getDateBuckets = (): Map<string, number> => {
    return new Map([
      ["1", 0],
      ["2", 0],
      ["3", 0],
      ["4", 0],
      ["5", 0],
      ["6", 0],
      ["6", 0],
      ["7", 0],
      ["8", 0],
      ["9", 0],
      ["10", 0],
      ["11", 0],
      ["12", 0],
    ]);
  };
  
  export const calculateGraphData = (
    year: number,
    sortedReminders: ReminderHistoryRecord[]
  ) => {
    // const startDate = new Date("2025-01-01");
    const endDate = new Date("2024-12-01");
    const dateBuckets = getDateBuckets();
    const bucketedReminders = new Map<number, ReminderHistoryRecord[]>();
  
    // creating map of reminder events by reminder id
    for (const reminder of sortedReminders) {
      const reminders = bucketedReminders.get(reminder.reminderId);
      if (reminders) {
        reminders.push(reminder);
        continue;
      }
      bucketedReminders.set(reminder.reminderId, [reminder]);
    }
  
    console.log("bucketedReminders", bucketedReminders);
  
    for (const bucketedReminder of bucketedReminders) {
      const reminders = bucketedReminder[1];
  
      // reminder hasn't been updated at all, only created and nothing else happened
      if (reminders.length === 1) {
        const reminder = reminders[0];
        const cost = reminder.cost;
        // Is the year we're requesting the graphs for in a following year to when it was started?
        const isItFutureYear = year > reminder.startedAt.getFullYear();
  
        // Is it ongoing and monthly
        if (
          reminder.type === Type.Ongoing &&
          reminder.frequency === Frequency.Monthly
        ) {
          // If we're requesting the graph data in the same year the reminder was started, then use it's month
          // If it's a future year, set the data from the first month of the year
          const initialMonth = isItFutureYear
            ? 1
            : reminder.startedAt.getMonth() + 1;
  
          for (let i = initialMonth; i < 13; i++) {
            dateBuckets.set(
              i.toString(),
              (dateBuckets.get(i.toString()) ?? 0) + cost
            );
          }
          // Is it ongoing and yearly
        } else if (
          reminder.type === Type.Ongoing &&
          reminder.frequency === Frequency.Yearly
        ) {
          const month = reminder.startedAt.getMonth() + 1;
          dateBuckets.set(
            month.toString(),
            (dateBuckets.get(month.toString()) ?? 0) + cost
          );
          // Is it single record and in the year it was started
        } else if (reminder.type === Type.Single && !isItFutureYear) {
          const month = reminder.startedAt.getMonth() + 1;
          dateBuckets.set(
            month.toString(),
            (dateBuckets.get(month.toString()) ?? 0) + cost
          );
        }
      } else {
        for (let i = 0; i < reminders.length; i++) {
          const reminder = reminders[0];
          if (
            reminders.some(
              (r) => r.operationType === OperationType.ReminderDeleted
            )
          )
            break;
          const start = reminder.startedAt;
          // the window we want to calculate for will be until the created date of the next reminder update,
          // or in the case that there's no subsequent reminder history record we calculate up until the current date instead
          const end = reminders[i + 1]?.startedAt ?? endDate;
  
          console.log("end");
          console.log(end);
          console.log(endDate.getTime() - start.getTime());
        }
      }
    }
    console.log(dateBuckets);
    return dateBuckets;
  };
  
  // Steps
  // Get reminders sorted from earliest to latest from history table
  // Set a date range e.g. 2024-01-01 => 2024-12-01
  // Bucket reminders by id
  // Loop through bucketed reminders, adding information to the following
  // Create buckets for: Category total by id per date range
  // Loop through reminder running total from the beginning of the date range until the either the end of the date range or if the reminder has an updated
  // date then loop until that instead
  // If a user deletes a category, that will result in multiple reminder deleted triggers and so will factor in to the existing reminder deleted workflow
  // Get the latest category for a given reminder id to ensure that we're calculating against the correct one
  // If a reminder comes out in a given month then just attribute it to that month
  // If for a given reoccurence window e.g. monthly reoccurring reminder's cost is updated multiple times within that month, make sure we use the latest
  // cost within that window
  // If a record has type as single then it can never auto renew and it will not have a frequency
  
  // Users can't modify reminder history
  // If a user updates the price of a reminder, only future months will be updated to reflect the new price
  // User can change the renewal date as it doesn't affect the history calculation
  // Users can delete reminders and they won't show up in the history anymore
  
  //UI TODO
  // deleted reminder, data is gone
  // reminder doesn't autorenew data stays
  // remove auto renew field from form and add alternative way of pausing/stopping ongoing reminder
  // on creating a reminder we use day and month they inserted to set the start date.
  // hide month field when it's a montlhy ongoing reminder
  // prevent month and day fields from being edited
  