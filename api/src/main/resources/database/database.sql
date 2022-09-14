CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(255) NOT NULL,
    `salary` FLOAT NOT NULL,
    `schedule` VARCHAR(255) NOT NULL,
    `rfc` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'SELLER'),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employee_rfc_key`(`rfc`),
    UNIQUE INDEX `employee_email_key`(`email`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_name` VARCHAR(255) NOT NULL,
    `rfc` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE INDEX `supplier_name_key`(`supplier_name`),
    UNIQUE INDEX `supplier_rfc_key`(`rfc`)
);


CREATE TABLE `products` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `article_name` VARCHAR(255) NOT NULL,
    `wholesale_price` FLOAT NOT NULL,
    `retail_price` FLOAT NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`code`)
);


CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_code` INTEGER NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `client_id` INTEGER,
    `price` FLOAT  NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,
    `total` FLOAT  NOT NULL,
    `sale_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(`id`)
);

CREATE TABLE `product_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `product_code` INTEGER NOT NULL,

    PRIMARY KEY(`id`),
    UNIQUE INDEX `product_images_name_key`(`name`)
);

ALTER TABLE `sales` ADD CONSTRAINT `sales_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE  RESTRICT ON UPDATE CASCADE;

ALTER TABLE `sales` ADD CONSTRAINT `sales_product_code_fkey` FOREIGN KEY (`product_code`) REFERENCES `products`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `sales` ADD CONSTRAINT `sales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `products` ADD CONSTRAINT `products_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_code_fkey` FOREIGN KEY (`product_code`) REFERENCES `products`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

