# Healthlink 
## (This document is currently under construction. Feel free to explore the code in the meantime)

## Introduction
Healthlink is a full-stack social media website utilizing React on the front-end and an ASP.Net web API on the serverside. The relational database is managed with SQLExpress. Authentication is handled by firebase.

This website is for anyone who wants to get fitter with their friends. Users can create and join social groups that take part in fitness-based challenges. As a valid group member, users can join any active challenge. They will then be able to log and update their results until the challenge ends. 
Additionally, the platform could be used to manage scheduled meetups. For example, a yoga teacher might use a "challenge" as a way to estimate attendance for the next class.

## Purpose and motivation for project 
We all know that physical fitness is important to health. However, not everyone recognizes the profound positive effects of a healthy social life. Between work, school, and working out, it can be hard to make time for friends and family. Additionally, it can be difficult to manage social groups that meet up regularly. 

HealthLink seeks to fix all of that. Now you and your friends can challenge each other and stay in contact at the same time! You can also register your group, post a meetup (as a "challenge"), take attendance, and get RSVP's before the event (both via "progress").

## How does this application work?  
All users can:
- create and join groups
- create challenges for their groups
- join active challenges associated with their groups
- log and update their progress for an active challenge they have joined
- view results on past challenges

Group leaders can:
- Edit their group's info
- Edit a challenge (and make a challenge inactive)


## How was this application developed? 
![JavaScript](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![C#](https://img.shields.io/badge/C%23%20-%23239120.svg?&style=for-the-badge&logo=c-sharp&logoColor=white) ![.NET](https://img.shields.io/badge/.NET%20-%235C2D91.svg?&style=for-the-badge&logo=.net&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL_Server%20-%23CC2927.svg?&style=for-the-badge&logo=microsoft-sql-server&logoColor=white) ![React](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB)

![HTML5](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white) ![Reactstrap](https://img.shields.io/badge/Reactstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white) 

 ![Git](https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white) ![Visual Studio](https://img.shields.io/badge/Visual_Studio%20-%235C2D91.svg?&style=for-the-badge&logo=visual-studio&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VSCode%20-%23007ACC.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white) 

## How to install and run the application
### Firstly, note the following requirements:
#### Visual Studio, a terminal (ideally running gitbash or linux), Google Firebase account (free), SQL Server
1. First, clone down the repository to your local machine
2. Next, create a project on Google Firebase (this is necessary for authentication). You can find the website by simply googling "Google Firebase." 
3. Then click "get started" and "add project." You can name the project anything you like. While Firebase offers Google Analytics, that feature is unrelated to this project so you can simply turn that off. Then click "create project."
4. Next to the words "project overview," click the gear icon and go to settings. Take note of the project Id. This will be used later on.
5. On the left-hand side of the screen, click "build" then "authentication." You should now see the "get started" button.
6. Under the "native providers" heading, click "email/password." Enable the email/password switch. Make sure the passwordless sign-in option is disabled. Click "save."
7. Navigate to the "users" tab and add at least two users. Make sure to keep track of their passwords as this information will not be visible anywhere in the project. Also take note of the users Uid's. These will come up as well.
8. Navigate back to the project settings and note that your Firebase project now has a web API key. Take not of this, as it will be used later.
9. Open the local repository in Visual Studio. Navigate to the script located in the SQL folder. Navigate to the block of code located under this comment "-- Insert data into UserProfile table" by hitting ctrl + f and putting that quote into the search bar.
10. After VALUES, you will see a few user profiles. At the beginning of each user profile, you will see a string made of random numbers and letters. Replace these strings with the UID's from the users you created on firebase. You must also change the email to that of the corresponding user. Optionally, you can change the other values ([Username], [FullName], [Email], [ImageUrl])
11. Now save the SQL file and click the green play button located in the top left corner of the screen. A window will appear.
12. Click the "local" dropdown and select the first server option that begins with LAPTOP. (Mine looks like this: LAPTOP-TLLFOS5B\SQLEXPRESS). Now click "connect" and your database will be created. 
13. Verify that this is the case by selecting "View," "SQL Server Object Explorer," click the dropdown on your local server, then the dropdown called "databases." At this point, you should see a database called "HealthLink"
14. Now navigate through the following folders: client > src. There should be a file called .env.local. If there is not, create one. The only code in this file will be "REACT_APP_API_KEY=yourAPIkey" with no quotes and no spaces.
15. Now find the appsettings.json file in the home directory and change the "FirebaseProjectId": in quotes to reflect your project's id.
16. In your terminal, navigate to the client folder and run "npm install" to install the required dependecies. Leave this terminal window open but go back to Visual Studio.
17. At the top of the screen, you should see two green play buttons. The left button should say "HealthLink." If it says "IIS Express," click the dropdown and change it. Now click the play button to launch your server.
18. Navigate back to the terminal window. While still in the client directory, run "npm start" and your browser should launch the website! Have fun exploring the site!
19. To close the project, hit ctrl + C in your terminal and click the red square (stop debugging) in Visual Studio.

## Testing the functionality of the app
### Note that if you accidentally bungle the database, you can always run the SQL create script again to reset it to the original state. However, this won't include any changes you made while using the site.
1. First things first, attempt to sign in with the accounts you created. (Upon launching the server, you will see Swagger UI launch. If you are familiar, feel free to authenticate with swagger at this time and test the API endpoints. If not, proceed with the other steps)
2. Now we can attempt registration. Create a new account via the registration form.
3. After login, the user will see a landing page with their groups. Observe the group cards and the kind of info found there.
4. Next, click "Groups" in the navigation bar. The user will see a listing of all groups hosted on the site right now.
5. Click the title of any group. The user will be navigated to the Group Details page listing info about the group and its challenges. If you are not a part of the group yet, click the "join" button.
6. Now navigate to the Create A Group tab. Attempt to create a new group.
7. Once you have created a new group, navigate to the Create A Challenge tab. Enter the necessary information and select the group you just created. The user will be navigated to the Challenge Details page.
8. As there are no results, click the "join challenge" button and log your progress.
9. As the group leader, you are allowed to edit the challenge. Click the edit button and make the challenge inactive. Note that the Challenge Progress area now say "Challenge Results" instead. Also note that your results cannot be edited as the challenge is inactive.
10. Navigate back to the Group Details page and leave this group. Now navigate back to the Challenge Details page and note that your results have been deleted as you are no longer part of the group. However, you are still allowed to be the group leader and act as an "admin" for the group.
11. Navigate to a group you are still a member of. If you aren't a member anywhere, join a group. Now join a challenge, log progress, and delete your progress. Note that you cannot edit or delete anyone elses progress.
12. That should cover all the basic functionality the site offers at this time! Thank you for your interest in my project
