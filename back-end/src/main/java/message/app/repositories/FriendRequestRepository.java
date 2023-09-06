package message.app.repositories;

import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    @Query("SELECT NEW message.app.dtos.friendrequest.RequestDto(fr.friendRequestId, fr.sender.accountId, fr.receiver.accountId, fr.status, fr.message, fr.sendTime) FROM FriendRequest fr WHERE fr.sender.accountId = :senderId AND fr.status = 'PEN'")
    List<RequestDto> findRequestBySender_AccountId(Long senderId);
    @Query("SELECT NEW message.app.dtos.friendrequest.RequestDto(fr.friendRequestId, fr.sender.accountId, fr.receiver.accountId, fr.status, fr.message, fr.sendTime) FROM FriendRequest fr WHERE fr.receiver.accountId = :receiverId AND fr.status = 'PEN'")
    List<RequestDto> findRequestByReceiver_AccountId(Long receiverId);
}
