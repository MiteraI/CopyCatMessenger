package message.app.dtos.friendrequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.dtos.account.PeopleDto;
import message.app.entities.enums.StatusType;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SentRequestDto {
    private Long requestId;
    private Long senderId;
    private PeopleDto receiver;
    private StatusType status;
    private String message;
    private LocalDateTime sendTime;
}
