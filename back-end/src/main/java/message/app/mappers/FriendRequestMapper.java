package message.app.mappers;

import message.app.dtos.friendrequest.RequestDto;
import message.app.entities.FriendRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FriendRequestMapper {
    RequestDto toRequestDto(FriendRequest friendRequest);
}
