CREATE TABLE `artists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stageName` varchar(255) NOT NULL,
	`genre` varchar(100),
	`bio` text,
	`profilePicUrl` text,
	`verificationStatus` enum('pending','approved','rejected') DEFAULT 'pending',
	`verificationDocUrl` text,
	`walletAddress` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `artists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255),
	`content` text,
	`featuredImageUrl` text,
	`status` enum('draft','published') DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `chatRooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`theme` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatRooms_id` PRIMARY KEY(`id`),
	CONSTRAINT `chatRooms_roomId_unique` UNIQUE(`roomId`)
);
--> statement-breakpoint
CREATE TABLE `collabProjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artistId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` text,
	`fundingGoal` decimal(12,2) NOT NULL,
	`currentFunded` decimal(12,2) DEFAULT '0',
	`deadline` datetime NOT NULL,
	`status` enum('active','funded','failed','completed') DEFAULT 'active',
	`smartContractAddress` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `collabProjects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `investmentTiers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`amount` decimal(10,2) NOT NULL,
	`ownershipStake` decimal(5,2) DEFAULT '0',
	`royaltyPercentage` decimal(5,2) DEFAULT '0',
	`limit` int,
	`investorCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `investmentTiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`tierId` int NOT NULL,
	`userId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`ownershipStake` decimal(5,2) DEFAULT '0',
	`royaltyPercentage` decimal(5,2) DEFAULT '0',
	`status` enum('pending','completed','refunded') DEFAULT 'pending',
	`smartContractAddress` varchar(255),
	`stripePaymentIntentId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `investments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `liveEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artistId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`scheduledAt` datetime NOT NULL,
	`streamUrl` text,
	`status` enum('scheduled','live','completed','cancelled') DEFAULT 'scheduled',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `liveEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`senderId` int NOT NULL,
	`receiverId` int,
	`roomId` varchar(255),
	`content` text NOT NULL,
	`isRead` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('message','purchase','project_update','investment','verification') NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`relatedId` int,
	`isRead` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`productId` int NOT NULL,
	`quantity` int DEFAULT 1,
	`priceAtPurchase` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalAmount` decimal(10,2) NOT NULL,
	`status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	`stripePaymentIntentId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artistId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`type` enum('digital_music','physical_merch','ticket') NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`imageUrl` text,
	`fileUrl` text,
	`inventory` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `songPurchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`trackId` int NOT NULL,
	`artistId` int NOT NULL,
	`purchaseDate` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `songPurchases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`artistId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`fileUrl` text NOT NULL,
	`genre` varchar(100),
	`mood` varchar(100),
	`bpm` int,
	`duration` int,
	`playCount` int DEFAULT 0,
	`releaseDate` datetime,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tracks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `userType` enum('listener','creator') DEFAULT 'listener';--> statement-breakpoint
ALTER TABLE `users` ADD `profilePicUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `headerImageUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `isVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` enum('active','inactive') DEFAULT 'inactive';--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionExpiresAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `artists` (`userId`);--> statement-breakpoint
CREATE INDEX `verification_idx` ON `artists` (`verificationStatus`);--> statement-breakpoint
CREATE INDEX `projectId_idx` ON `investmentTiers` (`projectId`);--> statement-breakpoint
CREATE INDEX `orderId_idx` ON `orderItems` (`orderId`);--> statement-breakpoint
CREATE INDEX `productId_idx` ON `orderItems` (`productId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `orders` (`userId`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `orders` (`status`);--> statement-breakpoint
CREATE INDEX `artistId_idx` ON `products` (`artistId`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `products` (`type`);--> statement-breakpoint
CREATE INDEX `artistId_idx` ON `tracks` (`artistId`);--> statement-breakpoint
CREATE INDEX `genre_idx` ON `tracks` (`genre`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `userType_idx` ON `users` (`userType`);