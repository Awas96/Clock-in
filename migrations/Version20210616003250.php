<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210616003250 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno DROP FOREIGN KEY FK_E797676287A5F842');
        $this->addSql('DROP INDEX UNIQ_E797676287A5F842 ON turno');
        $this->addSql('ALTER TABLE turno DROP evento_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE turno ADD evento_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE turno ADD CONSTRAINT FK_E797676287A5F842 FOREIGN KEY (evento_id) REFERENCES evento (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E797676287A5F842 ON turno (evento_id)');
    }
}
