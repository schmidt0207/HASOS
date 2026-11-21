insert into public.admins (user_id, nome)
select id, 'gremio'
from auth.users
where email = 'gremio2027@hasos.example.com';
