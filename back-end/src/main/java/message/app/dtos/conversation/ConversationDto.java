package message.app.dtos.conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.dtos.account.PeopleDto;
import message.app.entities.Account;
import message.app.entities.enums.ConversationType;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConversationDto {
    private Long conversationId;
    private String name;
    private ConversationType conversationType;
    private byte[] conversationAvatar;
    private List<Account> peopleDtoList;
}
