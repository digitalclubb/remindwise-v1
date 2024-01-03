declare
   current integer;
   reminder integer;
   currentYear integer;
   total float;
   spent float;
   new_total_spent float;
   new_total_upcoming float;
   select_historical historical%rowtype;
begin
  current := CAST(to_char(current_date, 'MM') as integer);
  reminder := CAST(to_char(new.date, 'MM') as integer);
  -- Need information of current date so I can get the correct historical record   
  -- Get existing historical data from db
  select * from public.historical where date_part('year', date) = date_part('year', current_date) and new."categoryId" = categoryid into select_historical;

  -- If it's a monthly recurring reminder we need to update all the following months as well
  if new.type = 'ONGOING' and new.frequency = 'MONTHLY' then
    total := 0;
    for i in 1..ARRAY_LENGTH(select_historical."monthTotals", 1) loop
       if i >= reminder then
         select_historical."monthTotals"[i] := select_historical."monthTotals"[i] + new.cost;
         total := total + new.cost;
       end if;
    end loop;

    if reminder > current then
     -- Calculate new total upcoming
     new_total_upcoming := select_historical."totalUpcoming" + total;
     new_total_spent := select_historical."totalSpent";
    else
     -- Calculate new total spent and new total upcoming
     spent := ((current - reminder) + 1) * new.cost;
     new_total_spent := select_historical."totalSpent" + spent;
     new_total_upcoming := select_historical."totalUpcoming" + (abs(total - spent));
    end if;
  else 
    -- Update just for affected month
    select_historical."monthTotals"[reminder] := select_historical."monthTotals"[reminder] + new.cost;

    -- If reminder month is greater then current we'll want to update our upcoming data otherwise we want to update totalSpent
    if reminder > current then
     -- Calculate new total upcoming
     new_total_upcoming := select_historical."totalUpcoming" + new.cost;
     new_total_spent := select_historical."totalSpent";
    else
     -- Calculate new total spent
     new_total_spent := select_historical."totalSpent" + new.cost;
     new_total_upcoming := select_historical."totalUpcoming";
    end if;
  end if;

  update public.historical set "totalUpcoming" = new_total_upcoming, "totalSpent" = new_total_spent, "monthTotals" = select_historical."monthTotals" where new."categoryId" = categoryid and auth.uid() = select_historical.userid and date_part('year', date) = date_part('year', current_date);
  return new;
end;
