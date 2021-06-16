<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210616003601 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE evento DROP FOREIGN KEY FK_47860B0569C5211E');
        $this->addSql('DROP INDEX UNIQ_47860B0569C5211E ON evento');
        $this->addSql('ALTER TABLE evento DROP turno_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE evento ADD turno_id INT NOT NULL');
        $this->addSql('ALTER TABLE evento ADD CONSTRAINT FK_47860B0569C5211E FOREIGN KEY (turno_id) REFERENCES turno (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_47860B0569C5211E ON evento (turno_id)');
    }
}
