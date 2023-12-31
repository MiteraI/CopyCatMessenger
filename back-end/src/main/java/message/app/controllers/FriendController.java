package message.app.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.account.AccountDto;
import message.app.dtos.friendrequest.ReceivedRequestDto;
import message.app.dtos.friendrequest.SentRequestDto;
import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.Account;
import message.app.entities.FriendRequest;
import message.app.entities.enums.Role;
import message.app.entities.enums.StatusType;
import message.app.services.FriendRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/friend")
public class FriendController {
    private final FriendRequestService friendRequestService;

    @GetMapping
    public ResponseEntity<List<FriendRequest>> getFriends() {
        try {
            AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            FriendRequest friendRequest = FriendRequest.builder()
                    .friendRequestId(1L)
                    .receiver(Account.builder().role(Role.USR).build())
                    .sender(Account.builder().role(Role.USR).build())
                    .status(StatusType.PEN)
                    .message("Hello friend")
                    .sendTime(LocalDateTime.now()).build();
            return ResponseEntity.ok(new ArrayList<FriendRequest>(List.of(friendRequest)));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping(value = "/sent-request")
    public ResponseEntity<List<SentRequestDto>> getSentFriendRequests() {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(friendRequestService.getSentRequest(authenticatedAccount.getAccountId()));
    }

    @GetMapping(value = "rejected-request")
    public ResponseEntity<List<SentRequestDto>> getRejectedFriendRequests() {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(friendRequestService.getRejectedRequest(authenticatedAccount.getAccountId()));
    }

    @GetMapping(value = "/received-request")
    public ResponseEntity<List<ReceivedRequestDto>> getReceivedFriendRequests() {
        AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(friendRequestService.getReceivedRequest(authenticatedAccount.getAccountId()));
    }

    @PostMapping
    public ResponseEntity<Object> createFriendRequest(@RequestBody JsonNode request) {
        try {
            AccountDto authenticatedAccount = (AccountDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            RequestDto friendRequest = friendRequestService.createRequest(
                    authenticatedAccount.getAccountId()
                    , request.get("username").asText()
                    , request.get("message").asText()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(friendRequest);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }

    @PutMapping("/accept")
    public ResponseEntity<Object> acceptFriendRequest(@RequestBody JsonNode request) {
        try {
            RequestDto friendRequest = friendRequestService.acceptRequest(request.get("requestId").asLong());
            return ResponseEntity.ok(friendRequest);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }
    }

    @PutMapping("/reject")
    public ResponseEntity<Object> rejectFriendRequest(@RequestBody JsonNode request) {
        try {
            RequestDto friendRequest = friendRequestService.rejectRequest(request.get("requestId").asLong());
            return ResponseEntity.ok(friendRequest);
        } catch (AppException e) {
            return ResponseEntity.status(e.getStatus()).body(e.getMessage());
        }    }

    @DeleteMapping
    public ResponseEntity<Object> deleteFriendRequest(@RequestBody JsonNode request) {
        return ResponseEntity.ok().build();
    }
}
