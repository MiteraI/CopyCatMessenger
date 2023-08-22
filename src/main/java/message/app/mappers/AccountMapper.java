package message.app.mappers;

import message.app.dtos.AccountDto;
import message.app.dtos.SignupDto;
import message.app.entities.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountDto toAccountDto(Account account);

    @Mapping(target = "password", ignore = true)
    Account signUpToAccount(SignupDto signupDto);
}
