CREATE TABLE IF NOT EXISTS `Birds` (`id` VARCHAR(255) , `name` VARCHAR(255), `family` VARCHAR(255), `continents` VARCHAR(255), `added` VARCHAR(255), `visible` VARCHAR(255) DEFAULT false, `createdAt` DATETIME, `updatedAt` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB;
