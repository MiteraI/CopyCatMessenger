package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.Account;
import message.app.entities.FriendRequest;
import message.app.entities.enums.StatusType;
import message.app.mappers.FriendRequestMapper;
import message.app.repositories.AccountRepository;
import message.app.repositories.FriendRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final AccountRepository accountRepository;
    private final FriendRequestMapper friendRequestMapper;

    public List<RequestDto> getSentRequest(Long accountId) {
        return friendRequestRepository.findRequestBySender_AccountId(accountId);
    }

    public List<RequestDto> getReceivedRequest(Long accountId) {
        return friendRequestRepository.findRequestByReceiver_AccountId(accountId);
    }

    public RequestDto createRequest(Long accountId, String username, String message) {
        Account sender = accountRepository.findById(accountId).get();
        if (sender.getUsername().equals(username))
            throw new AppException("Cannot create friend request with yourself", HttpStatus.BAD_REQUEST);
        Account receiver = accountRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Receiver's username not found", HttpStatus.NOT_FOUND));
        if (checkAlreadyReceived()) throw new AppException("Already received request from this person", HttpStatus.BAD_REQUEST);
        if (checkAlreadySent()) throw new AppException("Already sent request from this person", HttpStatus.BAD_REQUEST);
        //Not yet implemented friend request logic
        RequestDto friendRequest = friendRequestMapper.toRequestDto(FriendRequest.builder()
                .status(StatusType.PEN)
                .sender(sender)
                .receiver(receiver)
                .message(message)
                .sendTime(LocalDateTime.now())
                .build());

        return friendRequest;
    }

    private boolean checkAlreadyReceived() {
        return true;
    }

    private boolean checkAlreadySent() {
        return true;
    }
}
