package message.app.controllers;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.common.files.FileScaler;
import message.app.common.files.ImageScaler;
import message.app.dtos.account.AccountDto;
import message.app.dtos.account.ProfileDto;
import message.app.services.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<ProfileDto> getUserProfile() {
        return ResponseEntity.ok(new ProfileDto());
    }
    @GetMapping(value = "/avatar")
    public ResponseEntity<byte[]> getSelfAvatar() {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            byte[] avatar = profileService.getAccountAvatar(authenticatedAccount.getAccountId());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(avatar);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).build();
        }
    }
    @GetMapping(value = "/info")
    public ResponseEntity<Object> getSelfInfo() {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            ProfileDto profile = profileService.getAccountProfile(authenticatedAccount.getAccountId());
            return ResponseEntity.ok(profile);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }
    @PutMapping(value = "/update")
    public ResponseEntity<Object> updateProfile(@RequestBody ProfileDto profile) {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            ProfileDto updatedProfile = profileService.updateAccountProfile(authenticatedAccount.getAccountId(), profile);
            return ResponseEntity.ok(updatedProfile);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }
    @PutMapping(value = "/update-avatar")
    public ResponseEntity<Object> updateAvatar(@RequestPart("image") MultipartFile imageData) {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        FileScaler imageScaler = new ImageScaler();
        String filename = imageData.getOriginalFilename();
        String fileExtension = filename.substring(filename.lastIndexOf(".") + 1);

        if (imageData != null && !imageData.isEmpty()) {
            try {
                profileService.updateAccountAvatar(authenticatedAccount.getAccountId()
                        , imageScaler.scale(imageData.getBytes(), fileExtension));
                return ResponseEntity.ok("Saved avatar successfully");
            } catch (AppException e) {
                return ResponseEntity.status(e.getStatus()).body(e.getMessage());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.badRequest().body("No image data provided");
        }
    }
}
