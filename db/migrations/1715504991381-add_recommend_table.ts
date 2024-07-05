import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRecommendTable1715504991381 implements MigrationInterface {
  name = 'addRecommendTable1715504991381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recommends_recommend_category_enum" AS ENUM('column', 'Lunch', 'Dinner', 'Snack')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recommends" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "hash_tags" text array NOT NULL, "recommend_category" "public"."recommends_recommend_category_enum" NOT NULL DEFAULT 'column', CONSTRAINT "PK_3885874f3e6a6ea02cff3dc693c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recommends"`);
    await queryRunner.query(
      `DROP TYPE "public"."recommends_recommend_category_enum"`,
    );
  }
}
