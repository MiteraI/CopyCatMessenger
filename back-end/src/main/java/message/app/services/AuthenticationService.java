package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.common.files.FileScaler;
import message.app.common.files.ImageScaler;
import message.app.dtos.account.AccountDto;
import message.app.dtos.account.CredentialsDto;
import message.app.dtos.account.SignupDto;
import message.app.entities.Account;
import message.app.entities.enums.Role;
import message.app.mappers.AccountMapper;
import message.app.repositories.AccountRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
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
            return accountMapper.toAccountDto(account);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }
    public AccountDto register(SignupDto signupDto) {
        Optional<Account> optionalUser = accountRepository.findByUsername(signupDto.username());
        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        byte[] resizedDefaultAvatar;
        Resource defaultAvatarResource = new ClassPathResource("static/default-avatar.png");
        FileScaler imageScaler = new ImageScaler();
        try {
            resizedDefaultAvatar = imageScaler.scale(
                    StreamUtils.copyToByteArray(defaultAvatarResource.getInputStream())
                    , "png");
        } catch (IOException e) {
            throw new AppException("Error scaling image", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Account account = accountMapper.signUpToAccount(signupDto);
        account.setPassword(passwordEncoder.encode(CharBuffer.wrap(signupDto.password())));
        account.setRole(Role.USR);
        account.setAvatar(resizedDefaultAvatar);
        Account savedAccount = accountRepository.save(account);

        return accountMapper.toAccountDto(savedAccount);
    }

    public AccountDto findByLogin(String username) {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return accountMapper.toAccountDto(account);
    }
}
