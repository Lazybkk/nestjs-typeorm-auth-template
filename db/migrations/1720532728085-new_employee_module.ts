import { MigrationInterface, QueryRunner } from 'typeorm';

export class newEmployeeModule1720532728085 implements MigrationInterface {
  name = 'newEmployeeModule1720532728085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."employee_gender_enum" AS ENUM('Male', 'Female', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employee_status_enum" AS ENUM('Active', 'Terminated', 'OnLeave')`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" date NOT NULL, "gender" "public"."employee_gender_enum" NOT NULL, "jobTitle" character varying NOT NULL, "department" character varying NOT NULL, "startDate" date NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "address" text NOT NULL, "salary" numeric(10,2) NOT NULL, "status" "public"."employee_status_enum" NOT NULL DEFAULT 'Active', CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "legal_document" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "documentType" character varying NOT NULL, "filePath" character varying NOT NULL, CONSTRAINT "PK_950166ad59d051a80cad8337c76" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."dependent_relationship_enum" AS ENUM('Spouse', 'Child', 'Parent', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "dependent" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dateOfBirth" date NOT NULL, "relationship" "public"."dependent_relationship_enum" NOT NULL DEFAULT 'Other', "employeeId" integer, CONSTRAINT "PK_f35f7c227ee9a77bac8b023610c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "dependent" ADD CONSTRAINT "FK_9b86340048bfdfdd8a48b313037" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dependent" DROP CONSTRAINT "FK_9b86340048bfdfdd8a48b313037"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`DROP TABLE "dependent"`);
    await queryRunner.query(`DROP TYPE "public"."dependent_relationship_enum"`);
    await queryRunner.query(`DROP TABLE "legal_document"`);
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."employee_gender_enum"`);
  }
}
