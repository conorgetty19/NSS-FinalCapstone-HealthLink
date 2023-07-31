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
  [EndDateTime] DateTime NOT NULL,
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
  [LeaderUserProfileId] int,
  [Title] NVARCHAR(255) NOT NULL,
  [Description] NVARCHAR(255) NOT NULL,
  [ImageUrl] NVARCHAR(255) NOT NULL,
  [CreatedDateTime] DateTime NOT NULL
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
       ('4evHkRus1CUMoDLFpRwhrRJrlPg2', 'user3_username', 'User 3', 'user3@example.com', NULL, GETDATE()),
       ('IPAqfAX7xQZsklpuAaeck9C6qTl1', 'cgetty1', 'Conor Getty', 'conorgetty@gmail.com', NULL, GETDATE());

-- Insert data into Group table
INSERT INTO [Group] ([LeaderUserProfileId], [Title], [Description], [ImageUrl], [CreatedDateTime])
VALUES (1, 'Group 1', 'fake description blah blah', 'https://img.freepik.com/premium-photo/fitness-workout-group-team-people-happy-portrait-good-training-exercise-gym-class-session-diverse-sports-friends-man-woman-face-together-health-wellness-body-strength_590464-78765.jpg?w=2000', GETDATE()),
       (2, 'Group 2', 'fake description blah blah', 'https://img.freepik.com/premium-photo/fitness-workout-group-team-people-happy-portrait-good-training-exercise-gym-class-session-diverse-sports-friends-man-woman-face-together-health-wellness-body-strength_590464-78765.jpg?w=2000', GETDATE()),
       (2, 'Group 3', 'fake description blah blah', 'https://img.freepik.com/premium-photo/fitness-workout-group-team-people-happy-portrait-good-training-exercise-gym-class-session-diverse-sports-friends-man-woman-face-together-health-wellness-body-strength_590464-78765.jpg?w=2000', GETDATE()),
       (NULL, 'Group 4', 'fake description blah blah', 'https://img.freepik.com/premium-photo/fitness-workout-group-team-people-happy-portrait-good-training-exercise-gym-class-session-diverse-sports-friends-man-woman-face-together-health-wellness-body-strength_590464-78765.jpg?w=2000', GETDATE());

-- Insert data into GroupUser table
INSERT INTO [GroupUser] ([GroupId], [UserProfileId])
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (3, 3),
       (3, 4),
       (4, 4);

-- Insert data into Challenge table
INSERT INTO [Challenge] ([CreatedDateTime], [EndDateTime], [Title], [Description], [GroupId])
VALUES (GETDATE(), DATEADD(DAY, -10, GETDATE()), 'Expired Challenge', 'This challenge has already ended.', 1),
       (GETDATE(), DATEADD(DAY, 30, GETDATE()), 'Ongoing Challenge 1', 'Description for Ongoing Challenge 1', 1),
       (GETDATE(), DATEADD(DAY, 45, GETDATE()), 'Ongoing Challenge 2', 'Description for Ongoing Challenge 2', 2),
       (GETDATE(), DATEADD(DAY, 60, GETDATE()), 'Ongoing Challenge 3', 'Description for Ongoing Challenge 3', 3),
       (GETDATE(), DATEADD(DAY, 75, GETDATE()), 'Ongoing Challenge 4', 'Description for Ongoing Challenge 4', 2);

-- Insert data into Result table
INSERT INTO [Result] ([GroupUserId], [ChallengeId], [Content], [UpdateDateTime])
VALUES (1, 1, 'Result for Expired Challenge', DATEADD(DAY, -10, GETDATE())),
       (1, 2, 'Result for Ongoing Challenge 1', GETDATE()),
       (2, 2, 'Result for Ongoing Challenge 1', GETDATE()),
       (3, 3, 'Result for Ongoing Challenge 2', GETDATE()),
       (4, 3, 'Result for Ongoing Challenge 2', GETDATE()), 
       (4, 4, 'Result for Ongoing Challenge 3', GETDATE()),
       (5, 4, 'Result for Ongoing Challenge 3', GETDATE());
