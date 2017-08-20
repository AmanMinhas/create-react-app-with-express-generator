# Combine create-react-app with express-generator

## What is create-react-app & express-generator ?

### create-react-app
Bootstraping a react project before 'create-react-app' was definitely a pain and time consuming. I myself wrote an article about bootstraping a realistic react app https://medium.com/@amandeepsinghminhas/setting-up-a-simple-realistic-project-using-react-express-webpack-and-babel-ba412842f9d7. It is fair to say that, instructions in that article are near obsolete given that we now have create-react-app. Thank you Facebook. create-react-app makes bootstraping a project plain and simple without you having to work on a bunch of configurations.

### express-generator
Express-generator is another popular application generator tool to scaffold your application.

Let's start by checking our node and npm versions. You can run node -v and npm -v to check their versions, respectively.
* Node : v6.8.1
* Npm : 3.10.8

You can check if create-react-app or express-generator has been installed globally by running the following command.
`npm list -g --depth=0`

If you have not, then lets install them
* `npm i -g create-react-app`
* `npm i -g express-generator`

## Let's start then

express myapp
cd myapp
Your application structure will be something like this : https://gyazo.com/ca688de3eb1b3ab02f364f1944d3508e
Now let's run npm install to create our node_modules directory.
Your express app is ready.

Run npm start
You can see your project @ localhost:3000/

It'll be a simple page that says 'Welcome to Express'.
https://gyazo.com/b9559de4898210df26fe1e9202a22018

Let's open `myapp/routes/users.js`

Change 
```
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
```
to
```
/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = [
    {id: 1, fname: 'this', lname: 'guy'},
    {id: 2, fname: 'another', lname: 'guy'},
    {id: 2, fname: 'some', lname: 'guy'},
  ]
  res.send(users);
});
```
We are going to return an array of user objects instead of a string. Let's restart our server again and take a look @ http://localhost:3000/users to see our response.

Now let's open our myapp/package.json and update the following line 
from 
`"start": "node ./bin/www"`
to 
`"start": "PORT=3001 node ./bin/www"`

What we are doing is, we are starting our server @ port 3001 instead of 3000. We will get to why we are doing so later. Better way to do this would be to use process.env, but for the sake of this turotial, this will do. You can check `localhost:3001/` and `localhost:3001/users` to check if all is fine.

Let's commad+C and shut down our server for now.
Our server is ready! Our next step is to tie it up with creat-react-app. We are just going to use our express server to create our api end points.

In myapp/ run 
`create-react-app client`

This will create a new directory client. This is where all your react code it. Also notice that client directory has it's own package.json. Your project as it stands has 2 package.json files, one in myapp/ and another in myapp/client/

* `cd client`
* `npm start`

Our client is ready, we can check localhost:3000/ to find our bootstraped react app.
https://gyazo.com/1eec9982882277108076da2e829c010b

Now our express app runs at port 3001 and react app runs at port 3000. We want to be able to send api requests to port 3001. This is where proxy configuration comes in.
## Proxy Config
Open your client/package.json. Make sure its the package.json in client directory and not myapp/package.json, and add the following line
```
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:3001" // <- new line
}
```

What this will do is, if a request is sent from react app to a non static asset, it will forward the request to this proxy.
So you can send a request like 'localhost:3000/api/users' and it will forward the call to 'localhost:3001/api/users' (which is our express server).
This field can be populated with any server to serv your api's.

Let's update our `client/src/App.js` to look like this 
```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    };
  }
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        {users.map((user, key) => {
          return (
            <div key={key}>
              {user.fname} {user.lname}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
```
What we are doing here is sending a request to route /users and updaing our state with the response.
Open 2 tabs in terminal. In tab 1 we will start our server (express) and in tab 2 we will start a dev server for our react app.
```
*Tab 1
Navigate to myapp/
npm start

*Tab 2
Navigate to myapp/client
npm start
```

Open `localhost:3000/`
You will see this : https://gyazo.com/d7c13eb902ee3fadde06c390f0ab6b57

It does look ugly but our react app is now connected to our express server. Yay! It's at your mercy now to do anything with it.

You can find the code @ https://github.com/AmanMinhas/create-react-app-with-express-generator

