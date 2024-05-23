package com.denarius;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DenariusApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		System.setProperty("server.servlet.context-path", "/denarius");
		SpringApplication.run(DenariusApplication.class, args);
	}
}
