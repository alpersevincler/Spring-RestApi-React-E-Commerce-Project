package com.works.restcontrollers;

import com.works.entities.Users;
import com.works.services.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UsersRestController {


    final UsersService usersService;

    final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody Users users){

        return usersService.register(users);
    }


    @PostMapping("/login")
    public ResponseEntity login (@RequestBody Users users) throws Exception {
        Authentication authentication;
        try{
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(users.getEmail(),users.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch (BadCredentialsException ex){
            throw new Exception("Invalid Login Information");
        }

        return new ResponseEntity(users, HttpStatus.OK);
    }
}
