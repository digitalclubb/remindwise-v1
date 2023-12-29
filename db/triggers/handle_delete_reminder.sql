declare
   current integer;
   reminder integer;
   new_total_upcoming float;
   select_historical historical%rowtype;
begin
  current := CAST(to_char(current_date, 'MM') as integer);
  reminder := CAST(to_char(old.date, 'MM') as integer);
  -- If reminder month is greater then current we'll want to update our upcoming data
  if reminder > current then
   -- Get existing historical data from db
   select * from public.historical where old."categoryId" = categoryid into select_historical;

   -- Calculate new total upcoming
   new_total_upcoming := select_historical."totalUpcoming" - old.cost;
   
   -- If it's a monthly recurring reminder we need to update all the following months as well
   if old.type = 'ONGOING' and old.frequency = 'MONTHLY' then
    for i in 1..ARRAY_LENGTH(select_historical."monthTotals", 1) loop
        if i >= reminder then
          select_historical."monthTotals"[i] := select_historical."monthTotals"[i] - old.cost;
        end if;
    end loop;
   else 
      -- Calculate new upcoming for affected month
      select_historical."monthTotals"[reminder] := select_historical."monthTotals"[reminder] - old.cost;
   end if;

   -- Update historical record with new upcoming values
   update public.historical set "totalUpcoming" = new_total_upcoming, "monthTotals" = select_historical."monthTotals" where old."categoryId" = categoryid and auth.uid() = select_historical.userid;
   
  end if;
  return old;
end;
