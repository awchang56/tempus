## Tempus Coding Challenge

By Alexander Chang

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [webpack CLI](https://webpack.js.org/guides/installation/)

* Globally installed [mongoDB](https://docs.mongodb.com/manual/installation/#tutorials)

* Globally installed [redis](https://redis.io/topics/quickstart)

### 2. Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/awchang56/tempus.git && cd tempus

$ mkdir database/mongoose/data && mkdir database/mongoose/data/db && mkdir src/client/public/files

$ yarn install

$ yarn build
```
In separate terminal windows run the following 3 commands:

```sh
$ yarn mongo-start

$ redis-server

$ yarn server-start
```
Once the stack is up and running, go [here](http://localhost:3000/seed) to seed the database

Then, visit [Tempus Coding Challenge](http://localhost:3000)

##### Valid Credentials (Username: Password)

Patients:
* patient1: patient1
* patient2: patient2
* patient3: patient3
* patient4: patient4
* patient5: patient5

Doctor: 
* doctor1: doctor1

### 3. Tech Stack

**React**

I used React in this project because of its re-rendering efficiency and flexibility. I also chose React for its ease of use when controlling state. I did not have to do significant data modeling in this application, so Redux was not necessary. React, being primarily the View component of a MVC app, was sufficient for an app like this.

**Node/Express**

I chose Node/Express to take advantage of Node's native non-blocking I/O. This is not a processor intensive app, like a gaming application. Also Node is significantly easier to scale than Rails because of its blazing processing speed. It also allows for easier development, since both front and back end are written in the same language, there is no context switching and development time decreases.

**Mongoose/MongoDB**

I chose Mongoose/MongoDB because the data, while relational, is very document driven (files, appointments). It was also hard to determine ahead of time how long the appt purpose or message should be, so mongooose was the better choice, as document fields can be virtually any size. I aimed to optimize for speed in this app which NOSQL DBs handle better than SQL DBs which was important when trying to add/cancel an appointment or update appt confirmation, as those operations require two DB calls for 1 server call. I also used mongoose to predict future features, currently right now, images are saved locally, typically they are stored now in S3 buckets or uploaded to a server like Cloudinary from the client, however, with a monogoDB database, the potential to store the physical documents straight in the database is there.

**Redis**

I chose Redis for the caching of the username and password fields. I know it is overkill on this project, but it is extremely fast and efficient when it comes to key/value lookup for authentication. If this was fully deployed, I would take advantage of Redis's persistence feature to persist all user login information. 

**Semantic UI React**

I used Semantic UI React for its easy integration into React. It allows for easy development, as it is component driven, and seamlessly integrates with React's JSX.

### Known Issues

* As a doctor, when you enter a query into the search bar, and the search returns no results, the search box collapses until you backspace to a valid query
* As a doctor, after cancelling an appointment, if there are multiple appointments that require the user to scroll in the patient info modal, the scroll function gets disabled.
* For file management, I was only able to display the file if it was a picture. I stored the documents locally in src/public/files. When you delete a file, occasionally the file will remain on the screen, even after it's record has been deleted from the database. If you try to delete multiple times, it will not crash the app, I have coded to ensure smooth functionality.
