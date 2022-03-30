package com.denarius.config;

import com.denarius.service.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private DetailService detailService;

    // Password encoder variable
    private final PasswordEncoder passwordEncoder;

    // Instantiate the password encoder via constructor
    @Autowired
    public SecurityConfig(PasswordEncoder passwordEncoder, DetailService detailService) {
        this.passwordEncoder = passwordEncoder;
        this.detailService = detailService;
    }

    // Spring security configuration for the web-app
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/index", "/error/**", "/css/**", "/js/**", "/images/**").permitAll() // Allow all users to freely access <index.html> page
            .and()
                .authorizeRequests()
                .anyRequest()
                .authenticated()
            .and()
            .formLogin()    // Allow form login for users
                .loginPage("/user-login")    // Change default login page to custom login popup on <index.html>
                .permitAll()
                .defaultSuccessUrl("/userinterface.html", true) // Set <userinterface.html> as the default success url after a correct login attempt
                .failureForwardUrl("/index.html")
                .usernameParameter("username")
                .passwordParameter("password")
            .and()
            .rememberMe()
                .tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(1))
                .key("something secure placeholder")
                .rememberMeParameter("remember-me")
            .and()
            .logout()
                .permitAll()
                .logoutUrl("/logout")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID", "remember-me")
                .logoutSuccessUrl("/index.html");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(detailService);
    }
}
