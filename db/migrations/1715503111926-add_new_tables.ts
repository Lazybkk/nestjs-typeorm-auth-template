import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNewTables1715503111926 implements MigrationInterface {
  name = 'addNewTables1715503111926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."meals_meal_type_enum" AS ENUM('Morning', 'Lunch', 'Dinner', 'Snack')`,
    );
    await queryRunner.query(
      `CREATE TABLE "meals" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "meal_type" "public"."meals_meal_type_enum" NOT NULL DEFAULT 'Morning', "name" character varying NOT NULL, "calories" integer NOT NULL, "image_url" character varying NOT NULL, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diary_record" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_0e738ab8bd889a1b0f7ed44f53c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercise_records" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "durations" integer NOT NULL, "title" character varying NOT NULL, "calories_burned" integer NOT NULL, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_b9684215c946799382f8052ff0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "body_records" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "weight" integer NOT NULL, "height" integer NOT NULL, "body_fat_percentage" integer NOT NULL, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_f0d2ca9b3f7b4f878d5a3051e11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "meals" ADD CONSTRAINT "FK_3111c7cf13da976d7ed18287811" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_record" ADD CONSTRAINT "FK_b6161593e6fa2cb11bc2665c9c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_records" ADD CONSTRAINT "FK_570dcb18a35b0e29a145b74e4da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "body_records" ADD CONSTRAINT "FK_faf459df2324eb3eca080b75b69" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "body_records" DROP CONSTRAINT "FK_faf459df2324eb3eca080b75b69"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_records" DROP CONSTRAINT "FK_570dcb18a35b0e29a145b74e4da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary_record" DROP CONSTRAINT "FK_b6161593e6fa2cb11bc2665c9c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "meals" DROP CONSTRAINT "FK_3111c7cf13da976d7ed18287811"`,
    );
    await queryRunner.query(`DROP TABLE "body_records"`);
    await queryRunner.query(`DROP TABLE "exercise_records"`);
    await queryRunner.query(`DROP TABLE "diary_record"`);
    await queryRunner.query(`DROP TABLE "meals"`);
    await queryRunner.query(`DROP TYPE "public"."meals_meal_type_enum"`);
  }
}
