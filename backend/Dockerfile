#Dockerfile backend
FROM maven:3.9.0-eclipse-temurin-17 AS build
WORKDIR /app

# Copiamos pom y dependencias
COPY pom.xml .
COPY src ./src

# Build del jar
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiamos el jar desde el stage de build
COPY --from=build /app/target/tareas-0.0.1-SNAPSHOT.jar app.jar

# Variables de entorno para DB y puerto
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_NAME=todoapp
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=7070
ENV SERVER_PORT=8081

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
