# Backend

### Fast Contact: 
[![gmail](https://img.shields.io/badge/mail-D14836?style=for-the-badge&logo=Gmail&logoColor=white)](mailto:michalhaj.kontakt@gmail.com)


## Tasks:
* create endpoint that will receive `latitude and longitude`,
* create integretion with third party API: https://open-meteo.com,
* calculate generatedEnergy with data from `open-meteo` for each of the 7 days,
* endpoint should return:
  * date,
  * weather code,
  * minimal and maximal temperature,
  * estiamted energy generated,
* data should be returned as json format
* validate data received from client: 
  * required parameters,
  * check the correctness of data types,
  * check if values are latitude and longitude 
* error handling from third party API
* tests


## Stack:
 - NodeJs
 - NestJs
 - TypeScirpt,
 - Jest,
 - Axios,
 - Class-validator

## Note:
I have tried to follow all best practices from nestjs documentation

<br />

### Run app locally
```shell
$ npm run start

or 

$ npm run start:dev
```
### Run unit test cases
```shell
$ npm run test
```

### Run e2e test cases
```shell
$ npm run test:e2e
```