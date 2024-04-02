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
  
  BEGIN
    select * from public.historical where date_part('year', new.date) = date_part('year', current_date) and new."categoryId" = categoryid into select_historical;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      select_historical := NULL;

  -- If it's a monthly recurring reminder we need to update all the following months as well
  if new.type = 'ONGOING' and new.frequency = 'MONTHLY' then

    -- if record exists (we're in the correct month), update the correct positions of the array with the new value
    for i in 1..ARRAY_LENGTH(select_historical."monthTotals", 1) loop
       if i >= reminder then
         select_historical."monthTotals"[i] := select_historical."monthTotals"[i] + new.cost;
       end if;
    end loop;

    -- if there's no existing record (we're in the past or future)
    -- select all existing years for that category
    -- if specific year doesn't exist create the new variable
    -- Update other years with monthly values
  else 
    -- One off payment
    -- If there's no existing record, create a new one with a new variable for that specific year
    -- new_historical := [0, 0, 0, 0, 0, 0, 0, 0,]

    -- If there is an existing record then update existing historical months
    select_historical."monthTotals"[reminder] := select_historical."monthTotals"[reminder] + new.cost;
    update public.historical set "monthTotals" = select_historical."monthTotals" where new."categoryId" = categoryid and auth.uid() = select_historical.userid and date_part('year', new.date) = date_part('year', current_date);
  end if;

  return new;
end;
