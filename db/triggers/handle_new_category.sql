begin
  insert into public.historical (categoryid, userid)
  values (new.id, new.userid);
  return new;
end;
