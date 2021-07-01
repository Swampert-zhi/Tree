drop table if exists image;

drop table if exists comment;

drop table if exists dailyitem;

drop table if exists reportitem;

drop table if exists user;

create table user
(
    user_id  int auto_increment
        primary key,
    username  varchar(20)  not null,
    password  varchar(100) null,
    goal      varchar(20)  null,
    image_url varchar(1024) null,
    constraint UsernameUnique
        unique (username)
);

create table comment
(
    comment_id int auto_increment
        primary key,
    date       date                 not null,
    owner_id   int                  not null,
    user_id    int                  not null,
    return_id  int                  null,
    text       varchar(200)         null,
    if_check   tinyint(1) default 0 not null,
    constraint FK_Reference_4
        foreign key (owner_id) references user (user_id),
    constraint FK_Reference_5
        foreign key (user_id) references user (user_id),
    constraint FK_Reference_6
        foreign key (return_id) references user (user_id)
);

create table reportitem
(
    item_id    int auto_increment
        primary key,
    user_id    int         null,
    item_name  varchar(50) not null,
    start_date date        null,
    end_date   date        null,
    constraint Title_StartTime
        unique (item_name, start_date),
    constraint FK_Reference_1
        foreign key (user_id) references user (user_id)
);

create table dailyitem
(
    daily_id int auto_increment
        primary key,
    item_id  int          not null,
    date     date         not null,
    content  varchar(500) not null,
    more     varchar(500) null,
    constraint ItemId_Date
        unique (item_id, date),
    constraint FK_Reference_2
        foreign key (item_id) references reportitem (item_id)
);

create table image
(
    image_id int auto_increment
        primary key,
    daily_id int not null,
    image_url varchar(1024) not null,
    constraint FK_Reference_3
        foreign key (daily_id) references dailyitem (daily_id)
);