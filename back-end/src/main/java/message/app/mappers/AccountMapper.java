package message.app.mappers;

import message.app.dtos.account.AccountDto;
import message.app.dtos.account.ProfileDto;
import message.app.dtos.account.SignupDto;
import message.app.entities.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountDto toAccountDto(Account account);
    @Mapping(target = "password", ignore = true)
    Account signUpToAccount(SignupDto signupDto);
    ProfileDto toProfileDto(Account account);
}
