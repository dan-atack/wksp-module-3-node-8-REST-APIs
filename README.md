# Module 3 - Node

_see bottom of this page, if you need help getting this onto your computer._

<img src='./__lecture/assets/cafe.jpg' />

## Exercise 1 - API Architecture

There s a corner cafe that wants your help to propel itself into the digital age... The owner, Greg, has read extensively and is anxious to get started, but lacks the technical chops to get his digital transformation off the ground. He _knows_ that big data is the way to go. He is planning on tracking _everything_ in his cafe.

He needs an RESTful API to serve all of the data that he'll have and gather more!

He's asked a couple of future developers to architect this API for him.

He wants to track _everything_ from the stock, the customers, the seating in the cafe.

Provide him with a series of REST endpoints that meet all, or most of the RESTful principles that you've just heard about! Your feedback will dictate how the database will eventually be built... no pressure.

_This activity is more about the discussion in how to best organize data endpoints. There will not be any coding, unless you really want to provide Greg with working endpoints that he can test in Insomnia._

Endpoints:

    Clients:

        /Walkins/:userid

        /Tables:table/seats:seat/user:userid

    Database:

        MenuItems/:item/food:food  => food is takes ingredients and the cook processes them into menu items

        MenuItems/:item/drink:drink => drink takes ingredients and the barista processes them into drinks

        Ingredients/:ingredient

        Money:

            /accountsRecievable - sales revenue


            /accountsPayable - wages, ingredients, rent, etc.
    
    Server (employees):

    /Waiter (order) {
        get_Order (promise)
        bring order (promise Resolved)
        get money (check if client is done eating (repeat if no))
        clear table when client leaves
        check condiment supply at table, if low replenish
    }

    /Barrista (order) {
        get_Order (promise)
        bring order (promise Resolved)
        get money (check if client is done eating (repeat if no))
        clear bar space when client leaves
    }

    /Barrista (makeDrink) {
        take ingredients
        return drink to server
    }





---

## Exercise 2 (Optional)

There is a `clients.js` file inside of the data folder.

Create RESTful endpoint (only one) that expects a search query and responds with the requested data, and/or the appropirate HTTP code.

---

<img src='./__lecture/assets/hangman.jpg' style='float:left;margin:24px 34px 6px 0;' />

## Exercise 3

Let's finally build that Hangman Game!

Obviously, this could all be done in the frontend, with vanilla JS, but where is the fun in that! Besides, we are not very trusting and keeping the entire game in the FE would allow users to cheat, if they knew enough JavaScript to find the answer in the `script`.

### Guidelines

You will divide your concerns in two: the frontend, and the backend. Start with the backend. Only move on to the frontend once you have a fully functional API.

#### Backend

- Create a data file with an array of 10 to 20 words objects. don't forget to `export` the array.
    - e.g. `{ word: 'bacon', id: '123', letterCount: '5' }`
- Create a RESTful API that contains these endpoints.
    `GET /hangman/words` This will return an object that contains
        - the `id` of a random word selected from an array of words
        - the `letterCount` of the word.
    - `GET /hangman/guess/:wordId/:letter` This will return
        - the appropriate status code
        - If the letter guessed is in the word, return an array of booleans that map the letter's position in the word. This will be processed by the FE.
- Once you have completed these steps, you should be able to _play_ the game via the Insomnia app to test your code.
- Grab pen and paper and test it out!

##### Challenge / Optional

The `/hangman/words` endpoint can also accept an `id` in its url, like so, `/hangman/words/:wordId`. If it's provided, it will return the word object, as it is in the array of words. _This is ONLY for testing purposes._ Do not use this endpoint in the Frontend.

Create some sort of authentication that will not allow this to be accessed by anyone without the proper credentials.

#### Frontend

- There is is an existant static endpoint in the public folder `/hangman`. use that to create your HTML.
- Add all of your JS to the `scripts.js` file.
- Create a UI for the game. At a minimum, you should have spaces for the letters in the word that into which you can add the letters, as they are guessed.
- User input is entirely up to you. It could be a set of 26 buttons, or yuo could listen for `keyDown` events.
- No need to render a hanging man...
- **The FE application will _NEVER_ know the word that the user is trying to guess.**
    - You will ask the server for a word.
    - It will provide a word object that includes an `id` and a `letterCount` that you will store to render the game.
- When the user guesses a letter, you will query the server with the `letter` and the `word.id`. The server will respond with the appropriate an array if indices as to where that letter is positioned in the word and a status code.
- Feel free to create some `sass` to style the hangman page.

---

## Exercise 4 (Optional)

If you need some _more_ work for today, take a look at [Programmable Web](https://www.programmableweb.com/) for an API that has data that is _free_ and interests you.

- Test out the API in Insomnia
- If it works as expected and provides you with good data that you feel you can work with, build a few endpoints in the server to `GET` data from there and render it from a static page in the `public` folder. (this means alse creating a `fetch` to your server to `get` the data.)

Fun times!

---

## Bibliography

- https://www.sitepoint.com/developers-rest-api/
- https://hackernoon.com/restful-api-design-step-by-step-guide-2f2c9f9fcdbf
- https://www.moesif.com/blog/api-guide/api-design-guidelines/
- https://ninenines.eu/docs/en/cowboy/2.6/guide/rest_principles/

---

## Getting this workshop to your computer!

1. Fork it from the GitHub repo page. (this will give you a copy of it in your account.)
2. Clone it to your computer using the `https` address.
    - On your computer, navigate to the folder where you have been saving your workshops. To through folders in the terminal, use
        - MAC: `ls` to view enclosed files/folders
        - WIN: `dir` to view enclosed files/folders
        - `cd <FOLDERNAME>` to move into a folder.
        - Use `cd ..` to go up one level (parent folder)
    - `git clone <URL>`
    - `cd` into the repo folder.
    - `code .`
    - Create a new branch to work from: `git checkout -b my-solutions`
    - Get to work!
    - Once you are done, stage the files with `git add .`
    - Commit them to the branch with `git commit -m 'I did it!`
    - Push it to GitHub `git push origin HEAD`
    - In the GitHub UI, open a PR
    - Done!!

---