package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.common.exceptions.AppException;
import message.app.dtos.account.PeopleDto;
import message.app.dtos.account.ProfileDto;
import message.app.entities.Account;
import message.app.mappers.AccountMapper;
import message.app.repositories.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class ProfileService {
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    public ProfileDto getAccountProfile(Long accountId) {
        ProfileDto profile = accountRepository.findProfileByAccountId(accountId)
                .orElseThrow(() -> new AppException("Unable to find user", HttpStatus.NOT_FOUND));
        return profile;
    }
    public byte[] getAccountAvatar(Long accountId) {
        byte[] avatar = accountRepository.findAvatarByAccountId(accountId)
                .orElseThrow(() -> new AppException("Unable to find avatar", HttpStatus.NOT_FOUND));
        return avatar;
    }
    public PeopleDto getPeopleProfile(String username) {
        PeopleDto profile = accountRepository.findPeopleByUsername(username)
                .orElseThrow(() -> new AppException("Unable to find user", HttpStatus.NOT_FOUND));
        return profile;
    }
    public List<PeopleDto> getPeopleWithStartingUsername(String username) {
        List<PeopleDto> people = accountRepository.findPeopleByUsernameStartingWithLetter(username);
        return people;
    }
    public ProfileDto updateAccountProfile(Long accountId, ProfileDto profile) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        account.setUsername(profile.getUsername());
        account.setIntroduction(profile.getIntroduction());
        account.setDob(profile.getDob());
        ProfileDto updatedProfile = accountMapper.toProfileDto(accountRepository.save(account));
        return updatedProfile;
    }
    public void updateAccountAvatar(Long accountId, byte[] avatar) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        account.setAvatar(avatar);
        accountRepository.save(account);
    }

}
