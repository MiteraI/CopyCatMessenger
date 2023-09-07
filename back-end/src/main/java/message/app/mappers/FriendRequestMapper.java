package message.app.mappers;

import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.FriendRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FriendRequestMapper {
    @Mapping(source = "sender.accountId", target = "senderId")
    @Mapping(source = "receiver.accountId", target = "receiverId")
    RequestDto toRequestDto(FriendRequest friendRequest);
}
