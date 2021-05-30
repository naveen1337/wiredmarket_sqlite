## Entities

name:
image:
price:
stock:
shortintro:
description:
category_id:
category_name:
available:

```sql
create table `products` (`id` integer not null primary key autoincrement,
 `name` varchar(255) not null,
 `image` varchar(255) not null,
 `price` integer not null,
 `stock` integer not null,
 `category_id` varchar(255) not null,
 `category_name` varchar(255) not null,
 `shortIntro` varchar(255) not null,
 `description` varchar(255) not null,
 `status` integer not null,
 `created_at` datetime default CURRENT_TIMESTAMP,
  foreign key(`category_id`) references `categories`(`id`) on delete SET NULL);

create unique index `name` on `products` (`name`)

```
