package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.dtos.friendrequest.RequestDto;
import message.app.repositories.FriendRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    public List<RequestDto> getSentRequest(Long accountId) {
        return friendRequestRepository.findRequestBySender_AccountId(accountId);
    }
    public List<RequestDto> getReceivedRequest(Long accountId) {
        return friendRequestRepository.findRequestByReceiver_AccountId(accountId);
    }
}
