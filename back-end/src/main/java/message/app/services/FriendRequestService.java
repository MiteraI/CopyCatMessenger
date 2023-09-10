package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.friendrequest.ReceivedRequestDto;
import message.app.dtos.friendrequest.SentRequestDto;
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
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final AccountRepository accountRepository;
    private final FriendRequestMapper friendRequestMapper;

    public List<SentRequestDto> getSentRequest(Long accountId) {
        return friendRequestMapper.toSentRequestDtoList(friendRequestRepository.findBySender_AccountIdAndStatus(accountId, StatusType.PEN));
    }

    public List<ReceivedRequestDto> getReceivedRequest(Long accountId) {
        return friendRequestMapper.toReceivedRequestDtoList(friendRequestRepository.findByReceiver_AccountIdAndStatus(accountId, StatusType.PEN));
    }

    public RequestDto createRequest(Long accountId, String username, String message) {
        Account sender = accountRepository.findById(accountId).get();
        if (sender.getUsername().equals(username))
            throw new AppException("Cannot create friend request with yourself", HttpStatus.BAD_REQUEST);
        Account receiver = accountRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Receiver's username not found", HttpStatus.NOT_FOUND));
        if (checkAlreadyReceived(sender.getAccountId(), receiver.getAccountId()))
            throw new AppException("Already received request from this person", HttpStatus.BAD_REQUEST);
        if (checkAlreadySent(sender.getAccountId(), receiver.getAccountId()))
            throw new AppException("Already sent request to this person", HttpStatus.BAD_REQUEST);
        FriendRequest friendRequest = FriendRequest.builder()
                .sender(sender)
                .receiver(receiver)
                .status(StatusType.PEN)
                .sendTime(LocalDateTime.now())
                .message(message)
                .build();
        RequestDto friendRequestDto = friendRequestMapper.toRequestDto(friendRequestRepository.save(friendRequest));

        return friendRequestDto;
    }

    private boolean checkAlreadyReceived(Long senderId, Long receiverId) {
        Optional<FriendRequest> friendRequest = friendRequestRepository.findBySender_AccountIdAndReceiver_AccountIdAndStatus(receiverId, senderId, StatusType.PEN);
        if (friendRequest.isPresent()) {
            return true;
        }
        return false;
    }

    private boolean checkAlreadySent(Long senderId, Long receiverId) {
        Optional<FriendRequest> friendRequest = friendRequestRepository.findBySender_AccountIdAndReceiver_AccountIdAndStatus(senderId, receiverId, StatusType.PEN);
        if (friendRequest.isPresent()) {
            return true;
        }
        return false;
    }
}
