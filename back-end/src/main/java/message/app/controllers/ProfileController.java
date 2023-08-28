package message.app.controllers;

import lombok.RequiredArgsConstructor;
import message.app.dtos.ProfileDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "api/profile")
public class ProfileController {
    @GetMapping
    public ResponseEntity<List<ProfileDto>> getProfiles() {
        return ResponseEntity.ok(new ArrayList<ProfileDto>());
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<ProfileDto> getProfile() {
        return ResponseEntity.ok(new ProfileDto());
    }
    @GetMapping(value = "/avatar")
    public ResponseEntity<byte[]> getAvatar() {
        return ResponseEntity.ok().body(new byte[0]);
    }

}
