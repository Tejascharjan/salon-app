package com.salon.service;

import com.salon.payload.dto.SignupDTO;
import com.salon.payload.response.AuthResponse;

public interface AuthService {

    AuthResponse login(String username, String password) throws Exception;
    AuthResponse signup(SignupDTO signupDTO) throws Exception;
    AuthResponse getAccessTokenFromTheRefreshToken(String  refreshToken) throws Exception;
}
