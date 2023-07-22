# Project Title

Chatbot integration

## Description

Integration of IBM Watson , offering two endpoints for chatting with Watson Assistant and resetting the session.

## API Endpoints

1. **POST /watson/chat(message)**: Send a user message to the Watson Assistant service and receive a response.

2. **POST /watson/reset**: Reset the Watson Assistant session.


## Usage
Create a .env file and set these variables : WATSON_API_KEY, WATSON_SERVICE_URL, WATSON_ASSISTANT_ID
Then run :
  npm install
  nest start
