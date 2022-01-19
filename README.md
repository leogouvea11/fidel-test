# Fidel API challenge Answers

# PART 1:

## 1. Have you ever used DynamoDb before?

No, it was the first time that I used DynamoDb.

For this challenge, I’ve been reading the official documentation that AWS provides, as well as videos and other articles.

## 2. How did you design your data model?

I design this data model using the API, I’ve made all the CRUD actions for each of the two models (offers and locations), and created all the data using the API itself.

## 3. What are the pros and cons of Dynamodb for an API request?

In my vision, the main point in using the DynamoDB with lambda is the scalability, this is because the DynamoDb is serverless, has unlimited throughput and storage, allowing the lambda function to get “Database as a service”.



# PART 2:

## 1. Have you used Functions as a Service (FaaS) like AWS Lambda in the past?

Yes, I’ve worked with lambda functions in the past but not with a serverless framework, we would deploy our services with Terraform. The way we do in my current company is to put a NodeJs application with Express inside the lambda, this way on the endpoint of the lambda we have another API. This way we can separate the lambda functions by contexts.

## 2. How do you write operations within a concurrent architecture (parallel requests, series of async actions, async MapReduce patterns, etc.)?

There are many ways in doing concurrent architecture, the way I like most is the event-driven architecture, where I am using SQS/SNS for queue management and pub/sub. This combined with event sourcing allows the application to be extremely scalable and reliable.


# BONUS:

## 1.What challenges do you foresee/have experienced for this part?

For this part the main problem would be to handle the update of each location hasOffer attribute one time that DynamoDb does not allow batch updates. The first challenge would be create a lambda function to update one Location at a time and create a SQS or other queue that can hold all the locations that would need to be updated, this way turning this process asynchronous.

## 2. How would you handle operations that might take too long to complete (minutes instead of the typical endpoint ms range)?

the way i handle this type of operation is broke them in smaller tasks and turn them asynchronous, this way we can run multiple operations at the same time and individually. In my vision this is the best way because we can handle each error on a small operation and solve them as quicly as possible.

## 3. If something fails in the middle of this long operation, how would you handle the error and notify the client?

We can send the client a notification via email/platform or other channel of communication. Or solve the error automatically or using some human intervention in case of technical issues. This is the reason on break the operation in smaller async operations where we can find and debug each exception and handle them.