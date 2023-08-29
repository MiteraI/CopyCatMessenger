package message.app.controllers;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.account.AccountDto;
import message.app.dtos.account.ProfileDto;
import message.app.services.ProfileService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "api/profile")
public class ProfileController {
    private final ProfileService profileService;
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
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            byte[] avatar = profileService.getAccountAvatar(authenticatedAccount.getAccountId());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(avatar);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).body(new byte[0]);
        }
    }

}
