<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231120111405 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__data AS SELECT MATNR, ERSDA, MATKL, ERNAM, MTART, MAKTX FROM data');
        $this->addSql('DROP TABLE data');
        $this->addSql('CREATE TABLE data (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, matnr CLOB NOT NULL, ersda CLOB NOT NULL, matkl CLOB NOT NULL, ernam CLOB NOT NULL, mtart CLOB NOT NULL, maktx CLOB NOT NULL)');
        $this->addSql('INSERT INTO data (matnr, ersda, matkl, ernam, mtart, maktx) SELECT MATNR, ERSDA, MATKL, ERNAM, MTART, MAKTX FROM __temp__data');
        $this->addSql('DROP TABLE __temp__data');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__data AS SELECT matnr, ersda, matkl, ernam, mtart, maktx FROM data');
        $this->addSql('DROP TABLE data');
        $this->addSql('CREATE TABLE data (MATNR CLOB DEFAULT NULL, ERSDA CLOB DEFAULT NULL, MATKL CLOB DEFAULT NULL, ERNAM CLOB DEFAULT NULL, MTART CLOB DEFAULT NULL, MAKTX CLOB DEFAULT NULL)');
        $this->addSql('INSERT INTO data (MATNR, ERSDA, MATKL, ERNAM, MTART, MAKTX) SELECT matnr, ersda, matkl, ernam, mtart, maktx FROM __temp__data');
        $this->addSql('DROP TABLE __temp__data');
    }
}
