package com.denarius.config;

import com.denarius.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final CustomSuccessHandler customSuccessHandler;

    @Autowired
    public SecurityConfig(PasswordEncoder passwordEncoder, UserService userService, CustomSuccessHandler customSuccessHandler) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.customSuccessHandler = customSuccessHandler;
    }

    // Spring security configuration for the web-app
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/test/**", "/index", "/error/**", "/css/**", "/js/**", "/images/**").permitAll() // Allow all users to freely access <index.html> page
                .antMatchers("/userinterface.html", "/css/interface.css", "/js/userinterface-js.js").hasAnyAuthority("USER") // Allow users with role USER to access these files
                .antMatchers("/admininterface.html", "/css/admin-interface.css", "/js/admininterface-js.js").hasAnyAuthority("ADMIN")// Allow users with role ADMIN to access these files
            .and()
                .authorizeRequests()
                .anyRequest()
                .authenticated()
            .and()
            .formLogin()    // Allow form login for users
                .loginPage("/user-login")    // Change default login page to custom login popup on <index.html>
                .permitAll()
                .successHandler(customSuccessHandler) // Set up a custom success handler for all user role types after a correct login attempt
                .failureForwardUrl("/index.html") // In case of an invalid username or password redirect back to <index.html>
                .usernameParameter("username")
                .passwordParameter("password")
            .and()
            .rememberMe()
                .tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(1)) // Validate remember me token for a whole day
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
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }
}
