package com.works.services;

import com.works.configs.Rest;
import com.works.entities.Authority;
import com.works.entities.Users;
import com.works.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class UsersService implements UserDetailsService {

    final UsersRepository usersRepository;

    final PasswordEncoder passwordEncoder;

    public ResponseEntity register( Users users ) {
        try {
            Optional<Users> optionalUsers = usersRepository.findByEmailEqualsIgnoreCase(users.getEmail());
            if (optionalUsers.isPresent()) {
                Rest rest = new Rest(false, "This user exists!");
                return new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            }else {
                String newPassword = passwordEncoder.encode(users.getPassword());
                users.setPassword(newPassword);
                usersRepository.save(users);

                Rest rest = new Rest(true, users);
                return new ResponseEntity(rest,HttpStatus.OK);
            }
        }catch (Exception ex) {
            Rest rest = new Rest(false, ex.getMessage());
            return new ResponseEntity(rest, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> optionalUsers = usersRepository.findByEmailEqualsIgnoreCase(username);
        if (optionalUsers.isPresent()) {
            Users users =optionalUsers.get();
            return new org.springframework.security.core.userdetails.User(users.getEmail(), users.getPassword(), parseAuthority(users.getAuthorities()));
        }
        throw new UsernameNotFoundException("User Not Found");
    }

    private Collection<? extends GrantedAuthority> parseAuthority(List<Authority> authorities) {
        List<GrantedAuthority> list = new ArrayList<>();
        for (Authority item: authorities) {
            list.add(new SimpleGrantedAuthority(item.getName()));
        }
        return list;
    }

}
