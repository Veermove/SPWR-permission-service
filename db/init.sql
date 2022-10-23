CREATE DATABASE "spwr";

CREATE TABLE IF NOT EXISTS "users"(
    "user_id" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "mail" TEXT NULL,
    "name" TEXT NULL,
    "pwr_assoc" INTEGER NOT NULL
);
CREATE INDEX "users_role_pwr_assoc_index" ON
    "users"("role", "pwr_assoc");
ALTER TABLE
    "users" ADD PRIMARY KEY("user_id");
CREATE TABLE IF NOT EXISTS "roles"(
    "role_id" VARCHAR(255) NOT NULL,
    "privileges" VARCHAR(255) CHECK
        ("privileges" IN('')) NOT NULL
);
ALTER TABLE
    "roles" ADD PRIMARY KEY("role_id");
CREATE TABLE IF NOT EXISTS "posts"(
    "id" UUID NOT NULL,
    "tags" UUID NULL,
    "content" TEXT NOT NULL,
    "creation_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "expiration_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "author" UUID NULL,
    "likes" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT '0',
    "hidden_since" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "rewards" bytea NULL
);
CREATE INDEX "posts_tags_author_index" ON
    "posts"("tags", "author");
ALTER TABLE
    "posts" ADD PRIMARY KEY("id");
CREATE TABLE IF NOT EXISTS "tags"(
    "tag_id" UUID NOT NULL,
    "names" TEXT NOT NULL
);
ALTER TABLE
    "tags" ADD PRIMARY KEY("tag_id");
CREATE TABLE IF NOT EXISTS "responds"(
    "res_id" INTEGER NOT NULL,
    "res_content" TEXT NOT NULL,
    "res_author" UUID NOT NULL,
    "res_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "orig_post" UUID NOT NULL,
    "res_likes" INTEGER NOT NULL,
    "res_reward" bytea NOT NULL
);
ALTER TABLE
    "responds" ADD PRIMARY KEY("res_id");
CREATE TABLE IF NOT EXISTS "pwr_association"(
    "assoc_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "pwr_association" ADD PRIMARY KEY("assoc_id");
ALTER TABLE
    "pwr_association" ADD CONSTRAINT "pwr_association_name_unique" UNIQUE("name");
ALTER TABLE
    "users" ADD CONSTRAINT "users_pwr_assoc_foreign" FOREIGN KEY("pwr_assoc") REFERENCES "pwr_association"("assoc_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_role_foreign" FOREIGN KEY("role") REFERENCES "roles"("role_id");
ALTER TABLE
    "responds" ADD CONSTRAINT "responds_orig_post_foreign" FOREIGN KEY("orig_post") REFERENCES "posts"("id");
ALTER TABLE
    "posts" ADD CONSTRAINT "posts_tags_foreign" FOREIGN KEY("tags") REFERENCES "tags"("tag_id");
ALTER TABLE
    "posts" ADD CONSTRAINT "posts_author_foreign" FOREIGN KEY("author") REFERENCES "users"("user_id");
ALTER TABLE
    "responds" ADD CONSTRAINT "responds_res_author_foreign" FOREIGN KEY("res_author") REFERENCES "users"("user_id");
