package message.app.dtos;

import java.time.LocalDate;

public record SignupDto(String username, char[] password, LocalDate dob) {
}
