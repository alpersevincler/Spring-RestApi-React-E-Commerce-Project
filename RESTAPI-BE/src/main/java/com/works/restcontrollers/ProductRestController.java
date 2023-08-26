package com.works.restcontrollers;

import com.works.entities.Product;
import com.works.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductRestController {

    final ProductService productService;

    @GetMapping("/list")
    public ResponseEntity list(){
        return productService.list();
    }

    @GetMapping("/list/{pid}")
    public ResponseEntity getSingleProduct (@RequestBody @PathVariable Long pid ){
        return productService.getSingleProduct(pid);
    }

    @PostMapping("/save")
    public ResponseEntity save(@Valid @RequestBody Product product){
        return productService.save(product);
    }

    @GetMapping("/delete/{pid}")
    public ResponseEntity delete( @PathVariable Long pid){
        return productService.delete(pid);
    }

    @PostMapping("/update")
    public ResponseEntity update (@Valid @RequestBody Product product){
        return productService.update(product);
    }

    @GetMapping("/category/{name}")
    public ResponseEntity getCategoryProduct (@RequestBody @PathVariable String name){
        return productService.getCategoryProduct(name);
    }

}