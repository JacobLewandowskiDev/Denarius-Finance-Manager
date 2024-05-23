FROM openjdk:11-jre-slim

COPY target/financeManager-1.0.jar financeManager-1.0.jar

EXPOSE 8080

CMD ["java", "-jar", "/financeManager-1.0.jar"]