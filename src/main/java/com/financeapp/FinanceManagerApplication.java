package com.financeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FinanceManagerApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(FinanceManagerApplication.class, args);
	}
}
