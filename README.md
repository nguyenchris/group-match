# Group Match

## Overview

Group-Match is a social networking web app where users can interact with each other within the real-time updated News Feed in order to post statuses, like other users' posts, comment on other users' posts, or edit their own comments. 

Users can search local events to determine if they would like to create a Meet Up based on their preferences where other users can then join the Meet Up.

<!-- ![](preview-gifs/customer.gif) -->

## Getting Started
> Sign up for API keys
  * [EventBrite](https://www.eventbrite.com/platform/)
  * [Google Maps](https://cloud.google.com/maps-platform/)
  * [Dark Sky](https://darksky.net/dev)

## Installation

> Clone and install with npm

```shell
$ git clone https://github.com/nguyenchris/group-match.git
$ npm install
$ npm start
```

> Create .env file at root directory with the values being your API keys

```js
JWT_SECRET=your-jsonWebToken-secret
GOOGLE_KEY=your-googlemaps-key
EVENTBRITE_TOKEN=your-eventbrite-key
DARK_SKY_KEY=your-darksky-key
```

## Technologies Used
1. React.js
2. Redux
3. MongoDB / Mongoose
4. Socket.io
5. Node.js
6. Bootstrap / reactstrap

<!-- 
### Commands

1. `node bamazonCustomer.js`

    * Purchase a product by ID

2. `node bamazonManager.js`

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

3. `node bamazonSupervisor.js`

    * View Product Sales by Department
    * Create New Department


### Examples

1. `node bamazonCustomer.js`
![](preview-gifs/customer.gif)

2. `node bamazonManager.js`
![](preview-gifs/manager.gif)

3. `node bamazonSupervisor.js`
![](preview-gifs/supervisor.gif)
 -->

### Author
[Chris Nguyen](https://github.com/nguyenchris)


