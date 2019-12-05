# FindDoctor - Full-Stack Project by Dasha Khobotova

## Links
- Link to deployed site: https://dashakho.github.io/react-health-app-client/
- Link to the front-end repository: https://github.com/dashakho/react-health-app-client
- Link to the deployed API: https://peaceful-crag-97430.herokuapp.com/

## Application Description
FindDoctor is a single-page application which allows users to search for doctors. Once signed up and authenticated, users can:
1. Create their own collection of doctors, update and delite them
2. Search for doctors from a third-party API belonging to [NPPES NPI Registry](https://npiregistry.cms.hhs.gov/)
3. Search for hospitals via Google Maps

The backend was built using Express.js and MongoDB. The front-end was built using React.js and Axios for http requests (the requests communicate with the back end and third-party API).

## Technologies Used
- Express.js
- Node.js
- Mongoose
- MongoDB
- Heroku
- Git & GitHub

## Setup and Installation:
1.  Fork and clone the respository locally
1.  Install dependencies with `npm install`.
1.  Ensure that you have nodemon installed by running `npm install -g nodemon`
1.  Ensure the server can run properly by running `npm run server`
1.  `git add` and `git commit` your changes.

#### Deploying to Heroku

Begin inside the root directory of your application.

1. Run `heroku create` in the command line in the root of the API to
create a new (blank) app on Heroku.
1. Commit to your local master branch
1. Push your latest code to Heroku (`git push heroku master`)
1. Setting up mLab on heroku:
  + Run heroku addons:create with mongolab:sandbox
`$ heroku addons:create mongolab:sandbox`
  + The first time you run the above command you may see a message like this:
  ```
  Creating mongolab:sandbox on ⬢ pacific-cliffs-91276... !
 ▸    Please verify your account to install this add-on plan (please enter a credit card) For more information, see
 ▸    https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify
 ```
 + You'll need to go to that URL, enter in your credit card information and then re-run the command again. This time you should see something like:
```
Creating mongolab:sandbox on ⬢ pacific-cliffs-91276... free
Welcome to mLab.  Your new subscription is being created and will be available
shortly. Please consult the mLab Add-on Admin UI to check on its progress.
Created mongolab-cubed-11237 as MONGODB_URI
Use heroku addons:docs mongolab to view documentation
```
  + Now you can log into your heroku dashboard, go to add-ons and click the mlab link. This will bring you to your mlab database.
  + If you already have an mLab account connected to your heroku account, you may see the second message and skip having to enter your credit card information.
  + Either way, if you see this output, it worked, and you can resume the following deployment steps.
1. in terminal, run: `git push heroku master`  (should build your site)
1. due to the first line of code in the `server.js` file, the default
deployment environment will be `production`
1. in terminal, run: `echo SECRET_KEY=$(openssl rand -base64 66 | tr -d '\n')`
this should generate a secret_key
1. in the terminal run:
`heroku config:set SECRET_KEY=<copy and paste secret_key generated from last command>`.
It should start with “SECRET_KEY= and a span of about 40 randomized characters”
1. you need to set your CLIENT_ORIGIN so that your deployed API will ONLY
accept requests from the correct domain. IF you're client is deployed on Github,
your ORIGIN will be:
      `https://<% github username %>.github.io`
1. Set your client ORIGIN by:
      `heroku config:set CLIENT_ORIGIN="https://<% github username %>.github.io"`
1. You should have three config variables set in heroku
(`heroku>settings>config vars`): MONGODB_URI, SECRET_KEY, CLIENT_ORIGIN
1. Once all three of these are set, run in terminal: `heroku restart`
1. Then in terminal, run: `heroku open`

A full list of Heroku commands can be accessed by running `heroku --help`


## Thought Process & Execution

* Planning: Initially I planned out the user stories and wireframes to maximize efficiency for users and ease of navigation.

* CRUD Actions to Back-end: After setting up the necessary files and forms, I tested each feature with API requests.

* Debug: I approached this project with a mindset of constantly making small changes and immediately testing those changes.

* Styling: I focused on functionality first and once I felt that I was happy with the amount of user features, I then shifted my focus to styling (only after functionality was solid). I utilized console logs and the React inspection chrome extension to drill into any issues that I ran into.


## API End Points

| Verb   | URI Pattern              | Controller#Action     |
|--------|--------------------------|-----------------------|
| POST   | `/sign-up`               | `users#sign-up`       |
| POST   | `/sign-in`               | `users#sign-in`       |
| DELETE | `/sign-out`              | `users#sign-out`      |
| PATCH  | `/change-password`       | `users#change-password`|
| GET    | `/doctors`                | `doctors#index`        |
| GET    | `/doctors/:id`            | `doctors#show`         |
| POST   | `/doctors`                | `doctors#create`       |
| DELETE | `/doctors/:id`            | `doctors#destroy`      |
| PATCH  | `/doctors/:id`            | `doctors#update`       |

2 additional GET requests utilizing external API urls.

All data returned from API actions is formatted as JSON.

## Unsolved Problems / Future Iterations
I am planning to further work on styling my app.

#### Wireframes
- [Link to Wireframes](https://bit.ly/36cH2gh)

#### User Stories
* As an unregistered user, I would like to sign up with my email and password.
* As a registered user, I would like to sign in with my email and password.
* As an authenticated user, I would like to be able to change password.
* As an authenticated user, I would like to be able to sign out.
* As an authenticated user, I would like to be able to create doctors.
* As an authenticated user, I would like to be able to update and delete doctors in my collection.
* As an authenticated user, I would like to be able to use search from a third-party API.
* As an authenticated user, I would like to be able to use search via Google Maps.

![image](https://media.git.generalassemb.ly/user/22462/files/037d0880-1780-11ea-9860-9fc905322cee)
