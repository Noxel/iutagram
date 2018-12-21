<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181221134140 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, path VARCHAR(255) NOT NULL, text VARCHAR(255) DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_C53D045F7E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, image_id INT NOT NULL, owner_id INT NOT NULL, text VARCHAR(255) NOT NULL, INDEX IDX_9474526C3DA5256D (image_id), INDEX IDX_9474526C7E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image_like (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, image_id INT NOT NULL, INDEX IDX_5E59AA2D7E3C61F9 (owner_id), INDEX IDX_5E59AA2D3DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE image_like ADD CONSTRAINT FK_5E59AA2D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE image_like ADD CONSTRAINT FK_5E59AA2D3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C3DA5256D');
        $this->addSql('ALTER TABLE image_like DROP FOREIGN KEY FK_5E59AA2D3DA5256D');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F7E3C61F9');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C7E3C61F9');
        $this->addSql('ALTER TABLE image_like DROP FOREIGN KEY FK_5E59AA2D7E3C61F9');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE image_like');
    }
}
