package com.works.services;

import com.works.entities.Card;
import com.works.repositories.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class CardService {

    final CardRepository cardRepository;

    public ResponseEntity list() {
        List<Card> list = cardRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    public ResponseEntity add(Card card) {
        try {
            cardRepository.save(card);
            return new ResponseEntity(card, HttpStatus.OK);
        }catch (Exception ex) {
            return new ResponseEntity(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
