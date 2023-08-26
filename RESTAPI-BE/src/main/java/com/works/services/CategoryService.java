package com.works.services;

import com.works.configs.Rest;
import com.works.entities.Category;
import com.works.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CategoryService {

    final CategoryRepository categoryRepository;

    public ResponseEntity list() {
        List<Category> list = categoryRepository.findAll();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    public ResponseEntity save( Category category ) {
        try {
            categoryRepository.save(category);
            Rest rest = new Rest(true, category);
            return new ResponseEntity(rest, HttpStatus.OK);
        }catch (Exception ex) {
            Rest rest = new Rest(false, ex.getMessage());
            return new ResponseEntity(rest, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity delete( Long cid ) {
        try {
            categoryRepository.deleteById(cid);
            Rest rest = new Rest(true,cid);
            return new ResponseEntity(rest, HttpStatus.OK);
        }catch (Exception ex) {
            Rest rest = new Rest(false,ex.getMessage());
            return new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity update( Category category ) {
        Optional<Category> optionalCategory = categoryRepository.findById(category.getCid());
        if (optionalCategory.isPresent()) {
            categoryRepository.saveAndFlush(category);
            Rest rest = new Rest(true,category);
            return new ResponseEntity(rest,HttpStatus.OK);
        }
        Rest rest = new Rest(false,category);
        return new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
    }

}
