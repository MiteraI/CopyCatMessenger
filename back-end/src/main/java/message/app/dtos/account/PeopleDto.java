package message.app.dtos.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PeopleDto {
    private Long accountId;
    private String username;
    private byte[] avatar;
    private String introduction;
    private LocalDate dob;
}
