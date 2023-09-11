package message.app.mappers;

import message.app.dtos.friendrequest.ReceivedRequestDto;
import message.app.dtos.friendrequest.SentRequestDto;
import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.FriendRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FriendRequestMapper {
    @Mapping(source = "sender.accountId", target = "senderId")
    @Mapping(source = "receiver.accountId", target = "receiverId")
    RequestDto toRequestDto(FriendRequest friendRequest);

    @Mapping(source = "friendRequestId", target = "requestId")

    SentRequestDto toSentRequestDto(FriendRequest friendRequest);

    @Mapping(source = "friendRequestId", target = "requestId")
    List<SentRequestDto> toSentRequestDtoList(List<FriendRequest> friendRequestList);

    @Mapping(source = "friendRequestId", target = "requestId")
    ReceivedRequestDto toReceivedRequestDto(FriendRequest friendRequest);

    @Mapping(source = "friendRequestId", target = "requestId")
    List<ReceivedRequestDto> toReceivedRequestDtoList(List<FriendRequest> friendRequestList);
}
