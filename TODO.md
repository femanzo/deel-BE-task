# Some considerations for the task

## 1. About the field validation
I have only added a few basic validations, that could be improved with a more complex validation library.

## 1. About the tools
As requested, I have used the following tools:
- supertest - for testing the API
- decimal.js - for handling the money values
- jest - for testing
- compression - for compressing the responses
- helmet - for adding security headers
- cors - for enabling CORS
- prettier/eslint - for code formatting/linting

## 1. About the testing
There are many other tests that could be written, I have only written a few to show how I would do it.

## 1. This needs to be clarified:
__***POST*** `/balances/deposit/:userId` - Deposits money into the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)__

I am guessing that a client can't have a balance that is greater than 25% of the total of jobs he has to pay. So, if a client has 1000 to pay, and he have a balance of 1000, he can't deposit more than 250.

The way it's written, it seems that a client can't deposit more than 25% of the total of jobs he has to pay, doesnt matter how much he has in his balance