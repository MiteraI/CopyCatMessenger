package message.app.repositories;

import message.app.dtos.account.PeopleDto;
import message.app.dtos.account.ProfileDto;
import message.app.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);

    @Query("SELECT new message.app.dtos.account.ProfileDto(accountId, username, introduction, dob) FROM Account WHERE accountId = :accountId")
    Optional<ProfileDto> findProfileByAccountId(Long accountId);

    @Query("SELECT new message.app.dtos.account.PeopleDto(accountId, username, avatar, introduction, dob) FROM Account WHERE accountId = :accountId")
    Optional<PeopleDto> findPeopleByAccountId(Long accountId);

    @Query("SELECT new message.app.dtos.account.PeopleDto(accountId, username, avatar, introduction, dob) FROM Account WHERE username = :username")
    Optional<PeopleDto> findPeopleByUsername(String username);

    @Query("SELECT new message.app.dtos.account.PeopleDto(accountId, username, avatar, introduction, dob) FROM Account WHERE LOWER(username) LIKE CONCAT(LOWER(:username), '%')")
    List<PeopleDto> findPeopleByUsernameStartingWithLetter(@Param("username") String username);

    @Query("SELECT avatar FROM Account WHERE accountId = :accountId")
    Optional<byte[]> findAvatarByAccountId(Long accountId);

}
