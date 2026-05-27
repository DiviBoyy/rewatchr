create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists watchlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  anime_id integer not null,
  anime_title text not null,
  anime_poster text,
  status text not null check (status in ('Watching', 'Completed', 'Plan to Watch', 'Dropped', 'On Hold')),
  episodes_watched integer default 0,
  total_episodes integer default 0,
  user_rating numeric check (user_rating >= 0 and user_rating <= 10),
  rewatch_worthy boolean default false,
  personal_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, anime_id)
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  anime_id integer not null,
  comment text not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table watchlist enable row level security;
alter table comments enable row level security;

create policy "profiles are readable" on profiles for select using (true);
create policy "users update own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "users manage own watchlist" on watchlist for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "comments are readable" on comments for select using (true);
create policy "users manage own comments" on comments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
