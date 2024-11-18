# How to set up and run this NextJSAssignment Application

This project was bootstrapped with [Create Next App](https://www.npmjs.com/package/create-next-app).

## Access the application Using Public Hosted Link

Open the application in your web browser:

### `https://at-next-training-9618cd9aa187.herokuapp.com/`

## Run the app locally

Clone the code from GitHub repository:

### `git clone https://github.com/HnKnA/NextJS-Assignment.git`

Install necessary dependencies:

### `npm install`

Or use `npm install --legacy-peer-deps` if you encounter conflicting peer dependency errors (it is not recommended but a temporary fix).

Launch the application:

### `npm run dev`

Access the application at `http://localhost:3000/`.

## Note:

### Response list:

- The response list when you are running locally and through the public hosted link will not be the same because the JSON file that stores the data for this application works differently in each environment.

- For deployment, Heroku’s file system is designed to be ephemeral. Any changes made to the file system, such as creating or updating files (like your JSON file), are not saved when the dyno restarts, sleeps, or gets redeployed. When the dyno restarts, it resets the file system to the last deployed state. Any new or updated files created during runtime are lost.

- For development, the storage JSON file will be updated each time a user creates a response, and I will push that change to GitHub right after.

- But rest assured that if you access the application through the hosted link continuously, the data will not be lost because the Heroku app is still in a running state, even if you turn off your computer and come back later.

- However, if the app goes into a sleeping state, subsequent accesses will only see the original data (the one present right before deployment).

### Interactive Form:

- Only the form from the Contact page can be submitted to collect users' responses.

![image](https://github.com/user-attachments/assets/25b9641f-ee79-497e-9466-77dd0c51664d)

### Loading screen:

- Sometimes, you will need to wait for a little bit before the response is fetched, mostly on pages that list the posts or responses.

### CSS vs JS:

- You can do mostly anything that appeared in the old project here.

- Styling is also mostly the same as the original project.

![image](https://github.com/user-attachments/assets/4cbd2afa-85da-40a2-87c6-9458dc10f522)

### Search bar:

- You can fill and submit the search bar; the URL will change, but the page will only reload because there is currently no implementation of the search API.

## Services:

### Home page:

![image](https://github.com/user-attachments/assets/f4715b4a-e327-4765-a4d9-0b60f25583be)

- Access the pagination bar for viewing appropriate pages.
- Interaction with JS is the same as original application
- Each page has 7 elements

### Category page:

![image](https://github.com/user-attachments/assets/ac6a3884-2ce0-405a-9218-9b5c364416b4)

- Access the pagination bar for viewing appropriate pages.
- Interaction with JS is the same as original application
- Each page has 7 elements

### Blog page:

![image](https://github.com/user-attachments/assets/49819f8a-2819-4886-bd2d-91f07983f3e8)

- There are currently 4 types of blogs
- Interaction with JS is the same as original application

### Style page:

![image](https://github.com/user-attachments/assets/4a76292b-9059-4e57-945c-90ca9df88ed6)

- Interaction with JS is the same as original application

### About page page:

- Interaction with JS is the same as original application

### Contact page:

- Interaction with JS is the same as original application
- Submit users' responses through contact form (new feature).

### Admin login page:

- Fill in your username and password, exactly as `admin` and `password` respectively, to access the response list from both the deployment and development environments.

### Response list page:

- View the list of responses that were submitted through the contact form.
- Access pagination bar for viewing appropriate pages

## I will also update many comments later for the ease or reading code.
