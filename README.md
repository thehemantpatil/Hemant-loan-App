# Loan App Using Angular and Spring Boot

In this project I have created a Loan App which contains a features of Create a loan and generate payment schedule for all loans.

<br>

## Run Locally
<hr>

- clone the project

```
git clone https://github.com/thehemantpatil/Hemant-loan-App.git
```
<br>

### To Start Angular Server
<hr>

- Move to project directory LoanApp
```
cd Angular/LoanApp
```

- Run the Following command to Start Angular server
```
ng serve
```

- Open Browser and Enter Following Command to Open Application.
```
http://localhost:4200/
```

<br>

### Database Setup
<hr>
In this Project I have Used PostgreSQL. You can use the database of your choice.

<br>

- [Install PostgreSQL](https://www.postgresql.org/download/windows/)


- Change the Database Credentials from 
`src/main/resources/application.properties` file. Create loan_app Schema from postgreSQL client.

```
spring.datasource.url=jdbc:postgresql://localhost:5432/loan_app

spring.datasource.username=postgres

spring.datasource.password=Hemant

```
<br>

### To Start Spring Boot Server
<hr>

- Go to the project directory of Spring Boot From parent Directory
```
cd Loan-App
```

- Run the Following command to Start Spring Boot server
```
mvn spring-boot:run
```

- Project Will be Running on the 8080 Port.
```
http://localhost:8080/
```
<br>

### Database Schema
<hr>

![image](/Images/DataBase_Schema.PNG)

<br>

### API structure to Fetch Loan Details for Each Customer
<hr>

<br>

```
[
    {
        "customerId": 1,
        "loanAmount": 1200,
        "loanReason": "Personal",
        "interestRate": 10,
        "tradeDate": "03/11/2021",
        "maturityDate": "03/11/2022",
        "paymentFrequency": "1 Month",
        "paymentTerm": "Evenly",
        "totalAmount": 1400,
        "paymentCycles": [
            {
                "interestAmount": 180,
                "paymentStatus": "PROJECTED",
                "repayAmount": 0,
                "repayDate": "Thu Nov 03 2022",
                "principleAmount": 1000,
                "loanReason": "Personal"
            }
        ]
    }
]
```

<br>

<hr>

<div align="center">
    <span style = "font-size: 1.3em; font-weight:bold"> Thanks </span>
<div>

<hr>
