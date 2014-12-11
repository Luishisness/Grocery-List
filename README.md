Project Description:

Adding More Features to GROCERY LIST

This project goal is to allow users access to their stored grocery lists. I want to 
include Bootstrap grid layout to give my application a professional appearance that has 
a good user feel to it. The user will need to provide authentication to access thier 
grocery lists. 

Requirments:

I will be adding more schemas to my db.js file. I plan to implement a sign in schema,
user schema, and more if neccessary as the project progresses.

User Stories:

I want to login into my account with a password and username

I want to see my grocery lists

I want to update my grocery and add grocery lists 

I want the option of signing out of my account

Modules:
(1 point) Integrate JSHint into your workflo
	npm install jshint

(2 points) Use a CSS framework throughout your site, use a reasonable of customization of the framework (don't just use stock Bootstrap): BOOTSTRAP
	npm install bootstrap

(2 points) Perform client side form validation using a JavaScript librar
	npm install angular-validation
	npm install validator
	
(1 point) Use a server-side JavaScript library or module that we did not cover in class (not including any from other requirements) - 1 point per library, max of 2
	 npm install angular-validation
	 npm install validator

(1 point) Use a client-side JavaScript library or module that we did not cover in class (not including any from other requirements) - 1 point per library, max of 2
(2 points) Use an external API
	possibly use datatables api

(1 point) Integrate visual effects
	research jquery effects

(2 points) Unit testing with JavaScript
	QUnit
	
	
	(2 points) Use responsive design to adapt your site to phone and tablet layouts (points cannot be used in conjunction with using a CSS framework)
done

(1 point) Integrate visual effects
… By using CSS 3 transitions or a JavaScript library like JQuery
Implement at least 3 effects (fade in/out, wiggle, etc.)
done

(1 point) Integrate JSHint into your workflow
done

(1 point) Using pre-built Express project templates
done


-------------------------------------------------------------------------------

Overview
Description
Create a grocery list site called Shoppy Shoperson. You'll explore the following concepts along the way:

extracting parameters from a URL path
working with checkboxes
creating a schema / data model
connecting to MongoDB with Mongoose
creating and reading data from MongoDB
creating a slug
In this application, you'll be able to:

create grocery lists
add items to the grocery list
check off items in the grocery list
(we won't worry about validation or users yet…)
You'll have 3 pages total:

/list a list of grocery lists (we'll call this list of lists page
/list/create a form to create new grocery lists (this is the list form page)
/list/[name-of-grocery-list] a grocery list details page that:
shows all of the items in a grocery list
allows you to add new items to the list
allows you to check off items from the list
Example Interaction
shoppy shoperson

Page Flow
diagram

Submission Process
You will be given access to a private repository on GitHub. Generate an Express application using express-generator (see instructions below) when you clone it.

The final version of your assignment should be in GitHub, but a submission should still be sent via NYU Classes.

Push your changes to the homework repository on GitHub.
Add the URL of the repository to your assignment submission in NYU Classes.
Commits later than that date will be handled on a case-by-case basis.
24 hour grace period where NYU Classes is still open.
After that, no late homeworks will be accepted.
(3 points) Make at Least 4 Commits
Commit multiple times throughout your development process.
Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).
Part 1 - Setup
(2 points) Installing Tools, Starting Project
Specifically, we'll be using the following tools to help with our development process:

nodemon to automatically restart your server
express-generator to create a bare-bones application
Install both globally:

npm install -g nodemon
npm install -g express-generator
Generate scaffolding (this will create a folder called grocery, along with app.js, a views directory, a public directory, etc.). Remember to use the --hbs flag to tell the generator that we'll be using handlebars:

express --hbs grocery
Install the dependencies that are required by the generated code:

cd grocery && npm install
Within the grocery directory, we'll be using a couple of tools to help with database access and creating url slugs:

npm install --save mongoose
npm install –save mongoose-url-slugs</code>
Lastly, start your server in a different terminal window using nodemon to automatically restart whenever a file changes:

nodemon bin/www
Part 2 - Installing MongoDB, Creating a Schema, Connecting to the Database
Install MongoDB
follow the install instructions for your operating system
ensure that it is up and running by connecting to it using a commandline client:
connect to the test database by typing in mongo (in any directory)
you should be given a message with the version number of the Mongo shell
….along with a prompt
CTRL-D quits
(2 points) Connect to the Database
Create a file called db.js within the root of your project directory. db.js will contain the following:

the required data related modules for our project
mongoose - our Object to Document Mapper, which we'll use to access MongoDB from our app
mongoose-url-slugs - a plugin for mongoose that automatically creates a unique slug property in a specified object
a slug is a string that serves as a short, human readable name
usually contains dashes to separate words, and a number suffix
for example, this-is-a-slug
Add the required modules:

var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');
Leave a placeholder for your schema…

// my schema goes here!
Here's the connection string… we'll connect to the local instance of MongoDB, and we'll use a database called grocerydb (this will be created for you once you start inserting documents!).

mongoose.connect('mongodb://localhost/grocerydb');
(3 points) Schema
For larger projects, there is usually one file per schema, all located in a separate folder called models. For now, however, define the following Schema within db.js. Check out the slides on:

the MongoDB Demo
and/or the Mongoose API
(or alternatively check out the docs!)
Your model should accommodate the following requirements:

for grocery list, List
name
createdBy
items (an Array of embedded documents… you can use the following syntax): items: [Item]
outside of the List schema, use the mongoose-url-slugs plugin to automatically generate a slug property:
[your schema name].plugin(URLSlugs('[what properties your slug should consist of]'));
(obvs, don't include the square brackets, and come up with your own schema name, etc.)
for an item in your grocery list, Item
name
quantity
checked
Drop this under your // my schema goes here! comment.

Then, use your schemas to define your models… these will be used as constructors later on in our project. You can place this code after your schema and before the connection (assuming that you're schema looks something like this):

mongoose.model('List', List);
mongoose.model('Item', Item);
Part 3 - Displaying All Grocery Lists, Adding New Lists
Overview
We'll be using mongoose to create, read and modify data from MongoDB, and we'll be doing this in the functions that handle our routes.

Consequently, in a file that contains your router (one of the files in the routes directory, your choice!):

require mongoose
retrieve a model (to be used as a contructor later)
var mongoose = require('mongoose'),
var List = mongoose.model('List');
You'll have to create routes for the following:

a list of grocery lists should be available at /list.
a form for creating a grocery list should be at /list/create
The flow of the grocery list create form should follow the conventional POST, redirect, GET workflow:

GET /list/create
POST /list/create
redirect to GET /list/[slug-name]
(4 points) List of Grocery Lists
GET /list

In this route handler:

retrieve all of the lists from the database (see the slides on the mongoose API)
place each grocery list should be placed in an unordered (ul) list of links
the link should be /lists/the-list-slug (where do you think you get the list slug from?)
you should also have a link to the create a list page…
this should all result in a page similar to the one below:
list

(4 points) Grocery List Form
GET /list/create

In this route handler:

show the create a list form
it should post to itself (/list/create)
it should look like this:
list

(4 points) Handling the Form
POST /list/create

In this route handler:

use your mongoose model for a list to create a new List instance
… and, of course, save it (here's an example from our pizza demo)
within your callback for save, perform the redirect (only redirect to the next page when we're sure the new list has been saved)
this should redirect to the actual single list page that contains the list items… so the url it goes to would be similar to the links above: /list/[slug-name]
Testing Out Your Code So Far
try going to /list in your browser
verify there are no lists
click the link to the list form (grocery list creation page)
create a new list
this should redirect to a page that doesn't exist yet (to facilitate testing, you may want the result of your POST to redirect to /list temporarily, then revert the change when you get to the next part)
however, if you go back to /list you should see your new grocery list
Part 4 - Displaying All Items in a Grocery List, Adding New Items
(4 points) Displaying Grocery List Items
GET /list/[slug-name]

In this route handler:

you'll use the slug in the url to render a list details page
find exactly one list that matches the slug in the url
remember to use route parameters
use :slug in your path to specify a part of the path as a parameter
you can find this part of the path in your request object (req.params.slug)
when you pass this single grocery list to your object, you'll be able to access its items by using list.items (assuming that your key is list)
put all of the items in an unordered list (ul)
we'll handle the form in the next part, along with the checkboxes, but here's what the items will eventually look like
list

(8 points) Adding Grocery List Items
Instead of creating a separate page for adding items to your list, embed your form directly underneath your list (as shown in the screenshot above).

The flow of the item create form should be:

GET /list/[slug-name]
POST /item/create
redirect to GET /list/[slug-name] (go back to page that you came from)
First, add a form to create a new list item:

create a form that posts to /item/create
your form will have 3 inputs
quantity
name
and the slug of the list you're adding the item to
it's up to you to determine what form elements to use for these (check out the slides on revisiting forms)
you'll have to handle this post, so…

create a route handler to accept a POST /item/create…
(depending on how you've structured your application this may need to go into a different router file than the one you used for list creation)
use one of these methods to add an item (assuming that you've embedded items into list in your schema):
findOneAndUpdate
lots of callbacks
in your last callback, redirect back to the original list detail page
Part 5 - Checking Off Items
(6 points) Checking Off Items
Create another form for crossing off items that you already have. The flow of the item check form should be:

GET /list/[slug-name]
POST /item/check
redirect to GET /list/[slug-name]
You'll have to modify your template a bit to integrate this additional form:

the item check form will start above your unordered list that contains all of the items
and end after the last list item
note that it posts to /item/check
populate your form with some form elements:
a checkbox for each item
a submit button
…and a hidden input to specify the grocery list that these items belong to
use conditionals in your template to check if an item is checked
if it is, don't display a checkbox
instead, use a strikethrough to show that the item is crossed off your list
Finally, in your route handler, you'll have modify all of the items that were checked:

once again, get the grocery list that these items belong to
go through all of its items and change the embedded item documents appropriately
the last slide on the Mongoose API will be handy!
