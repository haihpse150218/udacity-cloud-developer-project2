# Project: Image Processing Microservice on AWS
# Development Server
## 1. The project demonstrates a working NodeJS service
### Starting the server with npm run dev runs a local
![alt text](1.png)
## 2. The project demonstrates RESTFUL design principles
### The stubbed @TODO1 endpoint
![alt text](image-3.png)
### Accepts valid requests including: [Curl Local Link](http://localhost:8082/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg)
![alt text](image.png)
![alt text](image-1.png)
## 3. The project demonstrates an appropriate use of HTTP status codes
###  Error code for caught errors 422
![alt text](image-2.png)
# Elastic Beanstalk Deployment
## 1. The project uses AWS Elastic Beanstalk’s CLI and Console Dashboard
### Beanstalk CLI eb init
![alt text](image-4.png)
![alt text](image-5.png)
![alt text](image-13.png)
### Beanstalk CLI eb create
![alt text](image-6.png)
![alt text](image-7.png)
### Beanstalk CLI eb deploy
![alt text](image-8.png)

## 2. A screenshot of the elastic beanstalk application dashboard:
![alt text](image-10.png)
![alt text](image-11.png)
![alt text](image-9.png)
## 3. The project includes functional cloud deployments
This endpoint responds to valid GET requests including: [GET requests](http://eb-image-processing-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg)
![alt text](image-12.png)