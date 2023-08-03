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
VALUES ('lnf98K7Wymg5WcD74jUITacXs522', 'johnLockeRocks', 'John Locke', 'user1@example.com', NULL, GETDATE()),
       ('Q6w6S5qIKEeaGokHVhFwpnpefo92', 'johnRawlsRules', 'John Rawls', 'user2@example.com', 'https://news.harvard.edu/wp-content/uploads/2005/05/24-mm-2.jpg', GETDATE()),
       ('4evHkRus1CUMoDLFpRwhrRJrlPg2', 'imannuelKantIsKool', 'Immanuel Kant', 'user3@example.com', NULL, GETDATE()),
       ('IPAqfAX7xQZsklpuAaeck9C6qTl1', 'cgetty1', 'Conor Getty', 'conorgetty@gmail.com', 'https://avatars.githubusercontent.com/u/115668909?v=4', GETDATE());

-- Insert data into Group table
INSERT INTO [Group] ([LeaderUserProfileId], [Title], [Description], [ImageUrl], [CreatedDateTime])
VALUES (4, 'Marathon Runners Club', 'We love to run!', 'https://p1.pxfuel.com/preview/1008/216/990/race-marathon-runners-athletes.jpg', GETDATE()),
       (2, 'Casual Swimmers Club', 'We swim, but our lives do not revolve around it', 'https://c1.peakpx.com/wallpaper/937/705/134/swimming-race-competition-start-wallpaper-preview.jpg', GETDATE()),
       (1, 'Elderly Walkers Club', 'My grandson created this for me and I love it. Lets all walk together!', 'https://c0.wallpaperflare.com/preview/674/838/560/adults-benches-bicycles-camera.jpg', GETDATE()),
       (4, 'AudioWalkers', 'Education is as important as being fit. We like to listen to audiobooks while we walk. Educational podcasts count!', 'https://img.ccnull.de/1045000/preview/1047374_6fa4018bb8c6f76dc442df701ce880b0.jpg', GETDATE()),
       (3, 'Lockes Yoga Class', 'Famous philosopher teaches yoga on weeknights', 'https://c1.peakpx.com/wallpaper/192/259/699/asana-women-yoga-classes-fitness-wallpaper-preview.jpg', GETDATE());

-- Insert data into GroupUser table
INSERT INTO [GroupUser] ([GroupId], [UserProfileId])
VALUES (1, 4),
       (1, 2),
       (2, 2),
       (2, 4),
       (3, 3),
       (3, 1),
       (4, 4),
       (4, 3),
       (4, 2),
       (4, 1),
       (5, 3),
       (5, 2);

-- Insert data into Challenge table
INSERT INTO [Challenge] ([CreatedDateTime], [EndDateTime], [Title], [Description], [GroupId])
VALUES ('2023-07-20 09:00:00', '2023-07-20 17:00:00', 'Marathon in the park', 'Come meet us in the park for a marathon!', 1),
       (GETDATE(), DATEADD(DAY, 30, GETDATE()), 'Who can run the most miles?', 'Lets see who can run the most miles before the end', 1),
       (GETDATE(), DATEADD(DAY, 365, GETDATE()), 'Thursday night class', 'We meet weekly at the library in the yoga section', 5),
       (GETDATE(), DATEADD(DAY, 365, GETDATE()), 'Friday night class', 'We meet weekly at the library in the yoga section', 5);

-- Insert data into Result table
INSERT INTO [Result] ([GroupUserId], [ChallengeId], [Content], [UpdateDateTime])
VALUES (1, 1, 'Ran the race in 4 hours!', '2023-07-20 17:00:00'),
       (2, 1, 'Finished in 3:59 ;)', '2023-07-20 16:59:00'),
       (12, 4, 'Ill be there! Might be a little late', GETDATE());
