GRANT ALL PRIVILEGES ON DATABASE webapp TO table_admin;

create table if not exists "Member"
(
    member_no varchar not null
        constraint member_pk
            primary key,
    password  varchar not null,
    name      varchar not null
);

comment on table "Member" is '회원';

alter table "Member"
    owner to table_admin;

create unique index if not exists member_member_no_uindex
    on "Member" (member_no);
