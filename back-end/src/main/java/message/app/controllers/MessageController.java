package message.app.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/message")
public class MessageController {
    @GetMapping(value = "/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("lol things great");
    }
}
