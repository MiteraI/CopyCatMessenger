package message.app.repositories;

import message.app.dtos.account.ProfileDto;
import message.app.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);
    @Query("SELECT new message.app.dtos.account.ProfileDto(accountId, username, introduction, dob) FROM Account WHERE accountId = :accountId")
    Optional<ProfileDto> findProfileByAccount(Long accountId);
    @Query("SELECT avatar FROM Account WHERE accountId = :accountId")
    Optional<byte[]> findAvatarByAccountId(Long accountId);
}
