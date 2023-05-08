package com.omquark.BoF2Editor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class ControllerConfig {

    @Bean
    public SecurityFilterChain setSecurityConfig(HttpSecurity https) throws Exception{
        https.cors().disable().csrf().disable().authorizeHttpRequests().anyRequest().permitAll();
        return https.build();
    }
}
