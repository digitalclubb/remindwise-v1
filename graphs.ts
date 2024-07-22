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
    id: number; // cant be changed
    userId: number; // cant be changed
    reminderId: number; // cant be changed
    startedAt: Date; // cant be changed
    frequency: Frequency; // cant be changed
    type: Type; // cant be changed
    day?: number; // cant be changed
    month?: number; // cant be changed
    operationType: OperationType;
    categoryId: number;
    cost: number;
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

//   type Output = {
//     totalMonthCosts: Map<string, number>;
//     perCategoryCosts: Map<string, Map<string, number>>
//   }

//   {
//     12: Map,
//     3: Map
//   }

// A monthly reminder and I want to pause. That sets auto renewal to false. We don't keep track of values anymore. It's like deleted but keeping the data.
  
  type AggregateData = {
    monthCosts: Map<string, number>;
    categoryId?: number;
    autoRenewal?: boolean; //TODO what are we doing with this
  };
  
  const reduceReminderHistory = (
    reminder: ReminderHistoryRecord,
    year: number,
    aggregateData?: AggregateData
  ) => {
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
      const initialMonth = isItFutureYear ? 1 : reminder.startedAt.getMonth() + 1;
  
      for (let i = initialMonth; i < 13; i++) {
        aggregateData?.monthCosts.set(i.toString(), cost);
      }
      // Is it ongoing and yearly
    } else if (
      reminder.type === Type.Ongoing &&
      reminder.frequency === Frequency.Yearly
    ) {
      const month = reminder.month?.toString() ?? 1;
      if (reminder.startedAt.getFullYear() <= year) {
        aggregateData?.monthCosts.set(month.toString(), cost);
      }
      // Is it single record and in the year it was started
    } else if (reminder.type === Type.Single && !isItFutureYear) {
      const month = reminder.month?.toString() ?? 1;
      aggregateData?.monthCosts.set(month.toString(), cost);
    }
  };
  
  export const calculateGraphData = (
    year: number,
    sortedReminders: ReminderHistoryRecord[]
  ) => {
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
  
    for (const [,reminders] of bucketedReminders) {
      const aggregateData: AggregateData = {
        monthCosts: getDateBuckets(),
        categoryId: reminders[0].categoryId,
        autoRenewal: reminders[0].autoRenewal,
      };
      // reminder hasn't been updated at all, only created and nothing else happened
      for (let i = 0; i < reminders.length; i++) {
        if (
          reminders.some((r) => r.operationType === OperationType.ReminderDeleted)
        )
          break;
  
        reduceReminderHistory(reminders[i], year, aggregateData);
      }
  
      for (const [key, value] of aggregateData.monthCosts) {
        dateBuckets.set(key, (dateBuckets.get(key) ?? 0) + value);
      }
    }
  
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
  
  // TODO
  // Drop all the tables
  // Create reminder history table and setup triggers
  // Update reminder table with startedAt field and calculate this on the UI
  