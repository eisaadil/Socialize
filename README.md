# Socialize Web Application [Summer Internship 2017]

This was a summer internship at Tata Consultancy Services, Riyadh

**Date:** 15th July to 16th August 2017

## Description: 
Developed a social networking website using Angular 4 for UI, Spring Boot for back-end and Postgres for database storage. The website’s main features are authentication, posting, searching for profiles and chatting. The chatting module uses Web Sockets for real time data transfer between client and server side.

### Angular 4:
 * The website’s UI is divided into several reusable and manageable components.
 * Used Angular Validation library for thorough front-end input validation.
 * Used routing to navigate using clean URLs.
 * Used Reactive Extensions (Rxjs) and HTTP libraries for handling data from the server side in real time using GET and POST requests. 
 * Used SockJS, which provides a web-socket object.
 * It receives all data in JSON format from the Spring REST API as stated below.
### Java/Spring Boot Framework
 * Understood concepts of the Spring Framework such as Beans, Dependency Injection, Inversion of Control, Annotations, Maven Dependencies, Autowiring, Cross Origin (CRON), Spring REST etc.
 * Used @RestController, @RequestMapping, @RequestParam, @RequestBody for handling requests from the client side. Depending on the request (GET or POST), the Controller returns data in JSON format. This JSON is sent to Angular.
 * Used Java Database Connector (JDBC) and Data Access Object (DAO) for accessing data in the Postgres Database. Made an alternate git branch using Hibernate Java Persistent API (JPA). It also uses the Postgre JDBC driver. Therefore PostgreSQL was used with the help of PgAdmin for ease of management.
 * Used GSON library for serialization/deserialization of JSON.
 * Used Spring Websocket for the chatting module. Streaming Text-Oriented Messaging Protocol (STOMP) is used for these communications. 
 * Postman was also used for testing Spring Boot backend independently. 
