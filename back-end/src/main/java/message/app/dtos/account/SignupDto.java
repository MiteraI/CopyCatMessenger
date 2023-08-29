package message.app.dtos.account;

import java.time.LocalDate;

public record SignupDto(String username, char[] password, LocalDate dob) {
}
