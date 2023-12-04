create table if not exists tasks
(
    id      uuid default gen_random_uuid() primary key,
    content text default null,
    user_id uuid references users (id)
);


create table tasks_shared
(
    id       uuid default gen_random_uuid() primary key,
    shared_id uuid,
    task_id  uuid references tasks (id)
)
