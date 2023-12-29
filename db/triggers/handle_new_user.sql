begin
  insert into public.settings (id, email)
  values (new.id, new.email);
  return new;
end;
