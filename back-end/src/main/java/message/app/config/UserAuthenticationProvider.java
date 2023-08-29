package message.app.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import message.app.dtos.account.AccountDto;
import message.app.entities.enums.Role;
import message.app.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final AuthenticationService authenticationService;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(AccountDto accountDto) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000); // 1 hour

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withIssuer("CopyCatMessenger")
                .withSubject(accountDto.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("accountId", accountDto.getAccountId())
                .withClaim("role", accountDto.getRole().toString())
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();
            
        DecodedJWT decoded = verifier.verify(token);

        AccountDto user = AccountDto.builder()
                .username(decoded.getSubject())
                .accountId(decoded.getClaim("accountId").asLong())
                .role(Role.valueOf(decoded.getClaim("role").asString()))
                .build();
        //Return principle which is who user is, credentials is proof for who user is, granted authorities needed to be read in security config
        return new UsernamePasswordAuthenticationToken(user, null, List.of(new SimpleGrantedAuthority(user.getRole().name())));
    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decoded = verifier.verify(token);

        AccountDto user = authenticationService.findByLogin(decoded.getSubject());

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}
