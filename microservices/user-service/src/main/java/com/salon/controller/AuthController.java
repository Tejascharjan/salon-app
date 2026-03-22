package com.salon.controller;

import com.salon.payload.dto.LoginDTO;
import com.salon.payload.dto.SignupDTO;
import com.salon.payload.response.AuthResponse;
import com.salon.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupDTO req) throws Exception {
        AuthResponse res = authService.signup(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO req) throws Exception {
        AuthResponse res = authService.login(req.getUsername(), req.getPassword());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/access-token/refresh-token/{refresh_token}")
    public ResponseEntity<AuthResponse> getAccessToken(@PathVariable String refreshToken) throws Exception {
        AuthResponse res = authService.getAccessTokenFromTheRefreshToken(refreshToken);
        return ResponseEntity.ok(res);
    }
}
