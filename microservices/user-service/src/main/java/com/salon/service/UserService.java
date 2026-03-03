package com.salon.service;

import com.salon.exception.UserException;
import com.salon.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User getUserById(long id) throws UserException;
    List<User> getAllUsers();
    void deleteUser(long id) throws UserException;
    User updateUser(Long id, User user) throws UserException;
}
