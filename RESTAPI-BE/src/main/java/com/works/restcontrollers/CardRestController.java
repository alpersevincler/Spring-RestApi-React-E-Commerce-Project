package com.works.restcontrollers;

import com.works.entities.Card;
import com.works.services.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
public class CardRestController {


    final CardService cardService;


    @GetMapping("/list")
    public ResponseEntity list() {
        return cardService.list();
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody Card card) {
        return cardService.add(card);
    }

}
