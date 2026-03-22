package com.salon.service.impl;

import com.salon.exception.UserException;
import com.salon.model.User;
import com.salon.payload.dto.KeyCloakUserDTO;
import com.salon.repository.UserRepository;
import com.salon.service.KeycloakService;
import com.salon.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final KeycloakService keycloakService;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(long id) throws UserException {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new UserException("user not found");
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(long id) throws UserException {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new UserException("user not exist with id : "+id);
        }
        userRepository.deleteById(user.get().getId());
    }

    @Override
    public User updateUser(Long id, User user) throws UserException {
        Optional<User> otp = userRepository.findById(id);
        if(otp.isEmpty()){
            throw new UserException("user not found with id : "+id);
        }
        User existingUser = otp.get();
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        existingUser.setUsername(user.getUsername());
        return userRepository.save(existingUser);
    }

    @Override
    public User getUserFromJwt(String jwt) throws Exception {
        KeyCloakUserDTO keyCloakUserDTO = keycloakService.fetchUserProfileByJwt(jwt);
        return userRepository.findByEmail(keyCloakUserDTO.getEmail());
    }
}
