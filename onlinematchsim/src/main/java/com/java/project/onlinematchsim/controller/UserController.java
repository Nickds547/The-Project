package com.java.project.onlinematchsim.controller;

import com.java.project.onlinematchsim.exception.ResourceNotFoundException;
import com.java.project.onlinematchsim.model.User;
import com.java.project.onlinematchsim.apiCalls.responseCalls.*;
import com.java.project.onlinematchsim.repos.UserRepository;

import com.java.project.onlinematchsim.security.UserPrincipal;

import com.java.project.onlinematchsim.security.CurrentUser;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('ASSIGNOR')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), currentUser.getRole(), currentUser.getDistrict(),
            currentUser.getSchoolname());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getRoles().toString(), user.getDistrict(),user.getSchoolname(), user.getEmail());

        return userProfile;

    }

    @GetMapping("/allusers")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('ASSIGNOR')")
    public List<UserProfile> getAllUsers(@CurrentUser UserPrincipal currentUser)
    {
        List<User> user = userRepository.findAll();
        List<UserProfile> userList = new ArrayList<>();

        for(int i = 0; i < user.size(); i++)
        {
            UserProfile userProfile = new UserProfile(user.get(i).getId(), user.get(i).getUsername(), user.get(i).getName(), user.get(i).getRoles().toString(), user.get(i).getDistrict(),user.get(i).getSchoolname() ,user.get(i).getEmail());

            userList.add(userProfile);

        }

        return userList;
    }
    
}



