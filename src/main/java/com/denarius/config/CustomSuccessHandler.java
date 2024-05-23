package com.denarius.config;

import com.denarius.model.CustomUserDetails;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class CustomSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String redirectURL = request.getContextPath();

        if (userDetails.hasRole("ADMIN")) {
            redirectURL = "admininterface.html";
        } else if (userDetails.hasRole("USER")) {
            redirectURL = "userinterface.html";
        } else {
            redirectURL = "index.html";
        }

        response.sendRedirect(redirectURL);
    }
}
