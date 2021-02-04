# Introduction

This is an API done in node.js/ express that:
1. Stores season and contestant data on almost all Bachelor and Bachelorette seasons
2. Stores user-created summaries of the data 

## Use Cases

This is for users who are interested in analyzing bachelor/ette related data in order to gleen important insights on the game. To see it in action, explore the client created alongside this API here: https://bachelor-analysis-app-3goylprt5.vercel.app/

## Authorization

There is no API key required for access 

## Responses

If an invalid request is submitted or some other error occurs, the application will respond with a JSON response in the following format:

{error : {message: ^^message would be here^^}}

## Status Codes

The Bachelor Analysis server returns the following status codes:

- 200	OK
- 201	CREATED
- 204	NO CONTENT
- 400	BAD REQUEST
- 404	NOT FOUND
- 500	INTERNAL SERVER ERROR