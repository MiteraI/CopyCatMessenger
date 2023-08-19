package message.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.entities.enums.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDto {
    private Long accountId;
    private String username;
    private Role role;
    private String token;
}
