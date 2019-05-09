# Issue Tracker

## TODO:
- [ ] Update date on `updated_on` field of issue model.

## Getting started

### Prerequisites
You will need to create a `keys_dev.js` file in the config folder as:
```
module.exports = {
    mongoURI: 'YOUR_OWN_MONGO_URI'
}
```

### Installation

```
# Clone the repository
git clone https://github.com/jesuodz/issue-tracker.git

# Cd and install dependencies for server
cd issue-tracker && npm install

# Install dependencies for client
npm run client-install

# Run both client and server
npm run dev

# Run server only
npm run server

# Run client only
npm run client
```

Server runs on `http://localhost:4000` and client runs on `http://localhost:3000`

## Author
Jesús Ordosgoitty [jesuodz](https://jesuodz.github.io) | [Twitter](https://twitter.com/jesuodz)

## Acknowledgments

* Inspired by [DevConnector](https://github.com/bradtraversy/devconnector)