# Delectable Recipes

Delectable Recipes is a full stack single page application with the front end built in Angular 9 and the back end with Node/Express.js using MongoDB as its database.

The live link for the app is here:

Attempting to download/clone the repository and run it locally will fail, as the repository does not contain the various configuration variables, maily because they include secret keys/passwords.

**Note**: This app is hosted on Heroku and may take a few minutes to start up if the website has not been visited recently. If so, please be patient and let Heroku restart the website.

# Delectable Recipes Supports the Following Functionalities:

- Viewing Recipes:

  - A user of the site can easily view recipes created by other users. These recipes include steps that can be easily paginated through via prev/next buttons in addition to a direct link to individuals Steps at the top of the step.
  - Users can also use a timer to ensure their accuracy in completing a step within a given time limit (if provided by the recipe creator).

- Creating an Account

  - Users can easily create an account for use on the website with minimal required information (name, email, password).
  - If a user forgets their account password, a reset password link will be provided for the user to reset their password (15 minute expiration upon serving).

- Creating and Editing Recipes
  - If a user has created an account and is logged in, the user can then create their own recipes.
  - Following a guided form, the user can:
    - Easily add appropriate information to the steps such as the step title, directions and an image or video to the step if desired.
    - Easily add their own image or video to the respective recipe steps. Users can add an image from any site, or a video from Youtube or Vimeo to their step for clarification if necessary, or for other reasons.
    - Add a timer to the step as well, so that readers of the recipe can measure the proper time to complete a given step (if applicable).
  - Using a similar form, users can go to their account page and edit the recipe of their choosing (that they created).
  - Users can also delete recipes they have created.
