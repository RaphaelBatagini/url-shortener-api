import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUrls1667424263473 implements MigrationInterface {
  private readonly table = "urls";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "original_url",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "shortened_key",
            type: "varchar",
            isUnique: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
