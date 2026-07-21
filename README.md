# Project Description

The site is live at https://cse340-final-beebe.onrender.com.

The site serves as a hub to be able to rate and review video games. The idea is that the site is owned by an outlet that employs critics that play and write reviews for video games. There is also the option for other outlets or significant figures to be awarded the verified status. A user is anyone else. These categories are then used to calculate average ratings within their respective group.

The main purpose behind the separation is an attempt to give a user as much information when looking at the rating of games. Rather than seeing one lump sum of averages, a user can see what different groups are saying about the game and hopefully make an informed decision on that. For example, maybe the user finds that they typically agree with the verified user score, but not necessarily the other two, so they will base purchases off of that.

# Database Schema

![image of database](/public/images/erd.png)

# User Roles

Roles are outlined as follows:

| Role     | Description                   | Permissions                                        |
| -------- | ----------------------------- | -------------------------------------------------- |
| Admin    | Site management/moderation    | Add, edit, delete resources (games, users, etc.)   |
| Critic   | Employed by the company       | Create company-sponsored content (such as reviews) |
| Verified | Represents an external outlet | Create content on behalf of external outlets       |
| User     | Basic user                    | Create unsponsored reviews                         |

Some distinctions between roles:

- Admins typically do not post reviews; their accounts are to be used for moderation. If an admin attempts to post a review, it will automatically be 'downgraded' to that of a critic (as they are also employees of the company)
- Critics are employed by and represent the company
- Verified users must prove that they represent an outlet or are an individual with significant appropriate 'pull' (or influence)

# Test Account Credentials

The passwords for the accounts were provided by the course. Here is a list of roles and their respective emails:

| Role     | Email                |
| -------- | -------------------- |
| Admin    | admin@example.com    |
| Critic   | critic@example.com   |
| Verified | verified@example.com |
| User     | user@example.com     |

# Known Limitations

At the current time, there are several limitations (or things that would benefit from an update). Some of them include:

- Deleting or editing resources as and admin has no verifying step; while the application checks to make sure they have the correct role, everything is currently one click away from being deleted forever
- Users (of any role) cannot currently edit created content. If they would like to change their review, it must be deleted and recreated
- No pagination means that the page could get very long and take a long time to load if there are many reviews. To prevent this, only a handful of the most recent reviews are loaded
- In a similar vein, there is nothing in place to shorten the visible size of a review, so if someone writes an extremely long review, it will take up most of the page
- Admin abilities are very limited. It would be nice to create a more robust suite of tools for admins to be able to moderate content
- Cover images for video games currently use a roundabout method of uploading to a Google Drive to be displayed. It would be nice to change this to a more streamlined approach
