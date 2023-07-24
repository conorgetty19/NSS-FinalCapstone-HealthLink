USE [master]
GO

IF db_id('HealthLink') IS NOT NULL
BEGIN
  ALTER DATABASE [HealthLink] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [HealthLink]
END
GO

CREATE DATABASE [HealthLink]
GO

USE [HealthLink]
GO


--------------------------------------------------

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Username] NVARCHAR(50) NOT NULL,
  [FullName] NVARCHAR(100) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  [ImageUrl] NVARCHAR(255) NULL,
  [CreatedDateTime] DateTime NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Challenge] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CreatedDateTime] DateTime NOT NULL,
  [EndDate] DateTime NOT NULL,
  [Title] NVARCHAR(100) NOT NULL,
  [Description] NVARCHAR(150) NOT NULL,
  [GroupId] int NOT NULL
)
GO

CREATE TABLE [GroupUser] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GroupId] int NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [Group] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [LeaderUserProfileId] int NOT NULL,
  [Title] NVARCHAR(255) NOT NULL,
  [CreatedDateTime] DateTime NOT NULL,
  [Active] bit
)
GO

CREATE TABLE [Result] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GroupUserId] int NOT NULL,
  [ChallengeId] int NOT NULL,
  [Content] NVARCHAR(100) NOT NULL,
  [UpdateDateTime] DateTime NOT NULL
)
GO

ALTER TABLE [GroupUser] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [GroupUser] ADD FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id])
GO

ALTER TABLE [Challenge] ADD FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id])
GO

ALTER TABLE [Group] ADD FOREIGN KEY ([LeaderUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Result] ADD FOREIGN KEY ([GroupUserId]) REFERENCES [GroupUser] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Result] ADD FOREIGN KEY ([ChallengeId]) REFERENCES [Challenge] ([Id])
GO


-----------------------------------------------------------------------------------

USE [HealthLink]

-- Insert data into UserProfile table
INSERT INTO [UserProfile] ([FirebaseUserId], [Username], [FullName], [Email], [ImageUrl], [CreatedDateTime])
VALUES ('lnf98K7Wymg5WcD74jUITacXs522', 'user1_username', 'User 1', 'user1@example.com', NULL, GETDATE()),
       ('Q6w6S5qIKEeaGokHVhFwpnpefo92', 'user2_username', 'User 2', 'user2@example.com', NULL, GETDATE()),
       ('4evHkRus1CUMoDLFpRwhrRJrlPg2', 'user3_username', 'User 3', 'user3@example.com', NULL, GETDATE());

-- Insert data into Group table
INSERT INTO [Group] ([LeaderUserProfileId], [Title], [CreatedDateTime], [Active])
VALUES (1, 'Group 1', GETDATE(), 1),
       (2, 'Group 2', GETDATE(), 1);

-- Insert data into GroupUser table
INSERT INTO [GroupUser] ([GroupId], [UserProfileId])
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (2, 3);

-- Insert data into Challenge table
INSERT INTO [Challenge] ([CreatedDateTime], [EndDate], [Title], [Description], [GroupId])
VALUES (GETDATE(), DATEADD(DAY, 30, GETDATE()), 'Challenge 1', 'Description for Challenge 1', 1),
       (GETDATE(), DATEADD(DAY, 45, GETDATE()), 'Challenge 2', 'Description for Challenge 2', 2);

-- Insert data into Result table
INSERT INTO [Result] ([GroupUserId], [ChallengeId], [Content], [UpdateDateTime])
VALUES (1, 1, 'Result 1 for Challenge 1', GETDATE()),
       (2, 1, 'Result 2 for Challenge 1', GETDATE()),
       (3, 1, 'Result 1 for Challenge 2', GETDATE()),
       (4, 2, 'Result 1 for Challenge 2', GETDATE());
