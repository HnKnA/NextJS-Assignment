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

<img width="943" alt="image" src="https://github.com/user-attachments/assets/f634c3ec-b68f-4de7-b7d8-50a23fc1cad3">

- The response list when you are running locally and through the public hosted link will not be the same because the JSON file that stores the data for this application works differently in each environment.

- For deployment, Heroku’s file system is designed to be ephemeral. Any changes made to the file system, such as creating or updating files (like your JSON file), are not saved when the dyno restarts, sleeps, or gets redeployed. When the dyno restarts, it resets the file system to the last deployed state. Any new or updated files created during runtime are lost.

- For development, the storage JSON file will be updated each time a user creates a response, and I will push that change to GitHub right after.

- But rest assured that if you access the application through the hosted link continuously, the data will not be lost because the Heroku app is still in a running state, even if you turn off your computer and come back later.

- However, if the app goes into a sleeping state, subsequent accesses will only see the original data (the one present right before deployment).

### Interactive Form:

- Only the form from the Contact page can be submitted to collect users' responses.

<img width="623" alt="image" src="https://github.com/user-attachments/assets/75de7b3d-9417-44bf-a3c4-b10a576e0cd3">

### Loading screen:

- Sometimes, you will need to wait for a little bit before the response is fetched, mostly on pages that list the posts or responses.

### CSS vs JS:

- You can do mostly anything that appeared in the old project here.

- Styling is also mostly the same as the original project.

<img width="948" alt="image" src="https://github.com/user-attachments/assets/00e8b738-a6f5-4bdf-837e-eccf139a4ee6">

### Search bar:

- You can fill and submit the search bar; the URL will change, but the page will only reload because there is currently no implementation of the search API.

## Services:

### Home page:

<img width="949" alt="image" src="https://github.com/user-attachments/assets/25103621-29df-45a1-a2f5-7c8a809e7517">

- Access the pagination bar for viewing appropriate pages.
- Interaction with JS is the same as original application
- Each page has 7 elements

<img width="632" alt="image" src="https://github.com/user-attachments/assets/06b60179-bc47-4812-83f5-79dad4d41d27">

### Category page:

<img width="923" alt="image" src="https://github.com/user-attachments/assets/031c46a8-ff05-4ca9-a3df-ffeae47b5905">

- Access the pagination bar for viewing appropriate pages.
- Interaction with JS is the same as original application
- Each page has 7 elements

### Blog page:

<img width="824" alt="image" src="https://github.com/user-attachments/assets/10968c63-2a76-4323-bcfb-51fe1667b4b1">

- There are currently 4 types of blogs
- Interaction with JS is the same as original application

### Style page:

- Interaction with JS is the same as original application

### About page page:

- Interaction with JS is the same as original application

### Contact page:

<img width="770" alt="image" src="https://github.com/user-attachments/assets/cb827430-8009-4019-b2db-07a74f5688da">

- Interaction with JS is the same as original application
- Submit users' responses through contact form (new feature).

### Admin login page:

<img width="902" alt="image" src="https://github.com/user-attachments/assets/9be60829-6cd3-4ffe-bd1f-1645b643f423">

- Fill in your username and password, exactly as `admin` and `password` respectively, to access the response list from both the deployment and development environments.

### Response list page:

<img width="889" alt="image" src="https://github.com/user-attachments/assets/912691f2-c4b9-4330-a566-3a9516fa7989">

- View the list of responses that were submitted through the contact form.
- Access pagination bar for viewing appropriate pages

## I will also update many comments later for the ease or reading code.
