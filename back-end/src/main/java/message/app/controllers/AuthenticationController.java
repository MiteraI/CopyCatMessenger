package message.app.controllers;

import lombok.RequiredArgsConstructor;
import message.app.config.UserAuthenticationProvider;
import message.app.dtos.AccountDto;
import message.app.dtos.CredentialsDto;
import message.app.dtos.SignupDto;
import message.app.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<AccountDto> login(@RequestBody CredentialsDto credentialsDto) {
        AccountDto accountDto = authenticationService.login(credentialsDto);
        accountDto.setToken(userAuthenticationProvider.createToken(accountDto));
        return ResponseEntity.ok(accountDto);
    }

    @PostMapping("/register")
    public ResponseEntity<AccountDto> register(@RequestBody SignupDto user) {
        AccountDto createdUser = authenticationService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getAccountId())).body(createdUser);
    }
}
