package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.account.ProfileDto;
import message.app.repositories.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProfileService {
    private final AccountRepository accountRepository;
    public ProfileDto getAccountProfile(Long accountId) {
        ProfileDto profile = accountRepository.findProfileByAccount(accountId)
                .orElseThrow(() -> new AppException("Unable to find user", HttpStatus.NOT_FOUND));
        return profile;
    }
    public byte[] getAccountAvatar(Long accountId) {
        byte[] avatar = accountRepository.findAvatarByAccountId(accountId)
                .orElseThrow(() -> new AppException("Unable to find avatar", HttpStatus.NOT_FOUND));
        return avatar;
    }
}
