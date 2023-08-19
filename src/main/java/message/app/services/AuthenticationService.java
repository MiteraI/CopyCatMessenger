package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.AccountDto;
import message.app.dtos.CredentialsDto;
import message.app.dtos.SignupDto;
import message.app.entities.Account;
import message.app.entities.enums.Role;
import message.app.mappers.AccountMapper;
import message.app.repositories.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;
    public AccountDto login(CredentialsDto credentialsDto) {
        Account account = accountRepository.findByUsername(credentialsDto.username())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), account.getPassword())) {
            return accountMapper.toUserDto(account);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }
    public AccountDto register(SignupDto signupDto) {
        Optional<Account> optionalUser = accountRepository.findByUsername(signupDto.username());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        Account account = accountMapper.signUpToAccount(signupDto);
        account.setPassword(passwordEncoder.encode(CharBuffer.wrap(signupDto.password())));
        account.setRole(Role.USR);
        Account savedAccount = accountRepository.save(account);

        return accountMapper.toUserDto(savedAccount);
    }

    public AccountDto findByLogin(String username) {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return accountMapper.toUserDto(account);
    }
}
