declare
   current integer;
   reminder integer;
   reminderOld integer;
   currentYear integer;
   total float;
   spent float;
   new_total_spent float;
   new_total_upcoming float;
   select_historical historical%rowtype;
begin
  current := CAST(to_char(current_date, 'MM') as integer);
  reminder := CAST(to_char(new.date, 'MM') as integer);
  reminderOld := CAST(to_char(old.date, 'MM') as integer);
  
  -- Get existing historical data from db
  select * from public.historical where date_part('year', date) = date_part('year', current_date) and new."categoryId" = categoryid into select_historical;

  new_total_upcoming := select_historical."totalUpcoming";
  new_total_spent := select_historical."totalSpent";
  -- If it's a monthly recurring reminder we need to update all the following months as well
  if new.type = 'ONGOING' and new.frequency = 'MONTHLY' then
    -- Date was changed
    if new.date != old.date then
        total := 0;
        for i in 1..ARRAY_LENGTH(select_historical."monthTotals", 1) loop
            if i >= reminder then
                select_historical."monthTotals"[i] := select_historical."monthTotals"[i] + new.cost;
                total := total + new.cost;
            end if;
            -- Need to remove the costs from the other months?
        end loop;
    -- if old was 4 and new is 6 need to update all the months in between (remove 2 months)
    -- if old was 6 and new is 4 need to update all the months in between (add 2 months)
    -- if old was 4 and new is 6, current is 6 update total spent (- 2x?)
    -- if old was 4 and new is 6, current is 7 update total spent (- 2x?)
    -- if old was 4 and new is 6, current is 5 update total upcoming (+ 1x)
    -- if old was 6 and new is 4, current is 5 update total spent (+ 1x), update total upcoming (- 1x)
    -- if old was 6 and new is 4, current is 6 update total total spent (+ 2x)
    -- if old was 6 and new is 4, current is 7 update total upcoming (+ 2x)
    end if;

    -- Cost was changed
    if new.cost != old.cost then
        -- only for the months above current we update the totals
        -- calculate number of months after today and update total upcoming
    end if;
  else
    -- Date was changed
    if new.date != old.date then
        select_historical."monthTotals"[reminderOld] := select_historical."monthTotals"[reminderOld] - old.cost;
        select_historical."monthTotals"[reminder] := select_historical."monthTotals"[reminder] + old.cost;
        -- If the new date is current or in the past
        if current >= reminder then
            -- If old date was in the future
            if current < reminderOld then
                new_total_upcoming := select_historical."totalUpcoming" - old.cost;
                new_total_spent := select_historical."totalSpent" + old.cost;
            end if;
        -- If new date is in the future
        else
            -- If old date was in the past
            if current >= reminderOld then
                new_total_upcoming := select_historical."totalUpcoming" + old.cost;
                new_total_spent := select_historical."totalSpent" - old.cost;
            end if;
        end if;
    end if;

    -- Cost was changed
    if new.cost != old.cost then
        -- reminder is in the future
        if reminder > current then
            select_historical."monthTotals"[reminder] := select_historical."monthTotals"[reminder] - old.cost + new.cost;
            new_total_upcoming := select_historical."totalUpcoming" - old.cost + new.cost;
        end if;
    end if;
    
  end if;

  update public.historical set "totalUpcoming" = new_total_upcoming, "totalSpent" = new_total_spent, "monthTotals" = select_historical."monthTotals" where new."categoryId" = categoryid and auth.uid() = select_historical.userid and date_part('year', date) = date_part('year', current_date);
  return new;
end;
