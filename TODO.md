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

For this task I am reseeding the database before tests, in a real world scenario I would mock the functions to simulate it, but for that, I would need to implement many other services that are not in the scope of this task.


## 1. This needs to be clarified:
1. __***POST*** `/balances/deposit/:userId` - Deposits money into the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)__

I am guessing that a client can't have a balance that is greater than 25% of the total of jobs he has to pay. So, if a client has 1000 to pay, and he have a balance of 1000, he can't deposit more than 250.

The way it's written, it seems that a client can't deposit more than 25% of the total of jobs he has to pay, doesnt matter how much he has in his balance

It's also not clear if this route should be authenticated (or if it should prevent a deposit from another profile), so I am using the getProfile middleware but not checking if the profile is the same as the userId in the route.
Since the userId is specified in the params, my best guess is that this route is a hook for a payment gateway, so it would have another kind of authentication.

1. ***POST*** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

Also not specified if anyone can pay for someone else's job. I'm assuming that clients can only pay for their contract's jobs.


## 1. Things I would consider for a real world scenario
- Pagination for listing endpoints
- Better validation library
- More complex error handling (custom errors, etc)
- Better Logging
- Better authentication / authorization
- Deployment scripts
- Environment variables
- Typescript
