package message.app.dtos.conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountIdConversationIdPairDto {
    private Long accountId;
    private Long conversationId;
}
