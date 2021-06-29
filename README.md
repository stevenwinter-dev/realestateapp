# Real Estate App

![Real Estate APP](https://i.imgur.com/eyurtOn.png)

## [Check it out!](https://blooming-fortress-96429.herokuapp.com/property)

## Introduction

The Real Estate App is a place for realtors to list available properties and for potential buyers to shop for their new home. 

Upon arrival to the site, the visitor can browse all of the available listings. If interested in more details, the visitor can select a property for closer inspection. This detailed view contains all of the information supplied by the realtor including a Google map of the location.

For further functionality, the visitor is required to register for an account. Once successfully registered and logged in, the user can add properties to their favorites list to view later. 

Registered users are also given access to the "Add a new listing" feature. A user may enter information about an available property including uploading pictures for the listing.

Be sure to check your email inbox for important messages. The Real Estate App will let you know by email when you successfully register a new account, when you have created a new listing, when you have deleted a listing, or when a user has favorited one of your properties. You will also receive an email with further instructions if you request a new password. 

## Technologies Used

- HTML
- CSS
- Materialize CSS
- EJS
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Google Maps API

## Key Packages

- Passport
- Bcrypt
- Multer
- Nodemailer

## Install Instructions
```bash
git clone https://github.com/stevenwinter-dev/realestateapp.git
cd realestateapp
npm install
node index.js
```

## Initial Wireframe

![Wireframe](https://i.imgur.com/sLDHlqo.png)
The first wireframe shows a basic look at the main page of the site. I knew my users would want to see available listings immediately so I chose to include them without requiring the user to navigate to a new page. I ended up adding a more modern hero section to the top of the page but below that the initial wireframe is still represented in the final product. 

![Wireframe](https://i.imgur.com/MXG84uj.png)
The next wireframe shows the detailed view of a particular property. I added a Google map to the bottom but otherwise stuck with this initial design.

![Wireframe](https://i.imgur.com/zsMzyIE.png)
Finally, my last wireframe shows the form used to create a new listing. I expanded the available options but this is basically what the final design looks like. The biggest change is that this view is only available to authenticated users and accessed from the Dashboard. I hadn't thought about this functionality when I first started this project so I didn't make a wireframe for the Dashboard. 

## User Stories

### MVP
- As a user, I want to view all available real estate listings.
- As a user, I want to select a listing I'm interested in and view more details.
- As a user, I want to add an available property to the list.
- As a user, I should be able to edit my listing.
- As a user, I should be able to delete my listing.

### Stretch Goals
- As a user, I'd like the ability to create a secure account.
- As a user, I want my listings to be secure from others so that only I may create, update, and delete my properties.
- As a user, I would like a Google Map on the listing to see exactly where the property is located.

## Major Hurdles

- I realized early on that this application required user authentication. When adding a new property I needed to reference the user who created it, due to the Mongoose models I setup. Without satisfying this condition the app would break. What started out as a fun stretch goal had become a requirement quite early in the development process. Thankfully, implmenting Passport authentication got the project back on track. 

- I had an issue with how to setup the user dashboard. Originally I thought each user should have a unique url for their dashboard (/dashboard/:userid). Ultimately, I decided against this method. It felt clunky and I was looking for a more elegant solution. I took inspiration from Facebook. Every user's Facebook looks different than mine and contains their own personal information, but it's the same url. This concept lead me to Express-Session which, along with Passport, gave every page access to the req.user. This breakthrough was huge and allowed each users user/dashboard to be unique.

- Error handling was another issue I hadn't anticipated. I was so pleased when I successfully setup user authentication I forgot that when a user does not correctly input their password, they probably want some feedback. Redirecting the user to the login screen and providing meaningful instruction on how to fix the error is so important and something I had taken for granted. Thankfully, I looked into flash messages and implemented those into the application.


## Future Features

- I think adding a search feature would be helpful for this project. Specifying a location is something a user would expect in an application like this. Each property contains an address already so implementing this would simply require an extra Mongoose query. 


![hearthstone simon](https://i.imgur.com/uReO3bX.png)