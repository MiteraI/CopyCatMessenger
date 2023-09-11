package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.friendrequest.ReceivedRequestDto;
import message.app.dtos.friendrequest.SentRequestDto;
import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.Account;
import message.app.entities.Conversation;
import message.app.entities.FriendRequest;
import message.app.entities.enums.ConversationType;
import message.app.entities.enums.StatusType;
import message.app.mappers.FriendRequestMapper;
import message.app.repositories.AccountRepository;
import message.app.repositories.ConversationRepository;
import message.app.repositories.FriendRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final AccountRepository accountRepository;
    private final ConversationRepository conversationRepository;
    private final FriendRequestMapper friendRequestMapper;

    public List<SentRequestDto> getSentRequest(Long accountId) {
        return friendRequestMapper.toSentRequestDtoList(friendRequestRepository.findBySender_AccountIdAndStatus(accountId, StatusType.PEN));
    }

    public List<SentRequestDto> getRejectedRequest(Long accountId) {
        List<FriendRequest> friendRequestList = friendRequestRepository.findBySender_AccountIdAndStatus(accountId, StatusType.REJ);
        List<SentRequestDto> sentRequestDtoList = friendRequestMapper.toSentRequestDtoList(friendRequestList);
        return sentRequestDtoList;
    }

    public List<ReceivedRequestDto> getReceivedRequest(Long accountId) {
        List<FriendRequest> friendRequestList = friendRequestRepository.findByReceiver_AccountIdAndStatus(accountId, StatusType.PEN);
        List<ReceivedRequestDto> receivedRequestDtoList = friendRequestMapper.toReceivedRequestDtoList(friendRequestList);
        return receivedRequestDtoList;
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

    @Transactional //Only when method have 2 or more repository method call
    // , this is necessary to ensure transaction since Jpa already has it own @Transactional
    public RequestDto acceptRequest(Long requestId) {
        FriendRequest friendRequest = friendRequestRepository.findByFriendRequestIdAndStatus(requestId, StatusType.PEN)
                .orElseThrow(() -> new AppException("Friend request data not found", HttpStatus.NOT_FOUND));
        friendRequest.setStatus(StatusType.ACC);
        Conversation conversation = Conversation.builder()
                .name(ConversationType.FRD.name())
                .conversationType(ConversationType.FRD)
                .accounts(List.of(friendRequest.getSender(), friendRequest.getReceiver()))
                .build();
        conversationRepository.save(conversation);
        RequestDto request = friendRequestMapper.toRequestDto(friendRequestRepository.save(friendRequest));

        return request;
    }

    public RequestDto rejectRequest(Long requestId) {
        FriendRequest friendRequest = friendRequestRepository.findByFriendRequestIdAndStatus(requestId, StatusType.PEN)
                .orElseThrow(() -> new AppException("Friend request data not found", HttpStatus.NOT_FOUND));
        friendRequest.setStatus(StatusType.REJ);
        RequestDto request = friendRequestMapper.toRequestDto(friendRequestRepository.save(friendRequest));

        return request;
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
