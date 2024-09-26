package com.facesmash.facesmash;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dll3jvt1p",
                "api_key", "741577518456565",
                "api_secret", "JWl1PZBZNGu30BMIoo53JQDSv6Q"
        ));
    }
}
