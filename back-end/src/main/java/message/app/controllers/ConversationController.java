package message.app.controllers;

import lombok.RequiredArgsConstructor;
import message.app.dtos.account.AccountDto;
import message.app.dtos.conversation.AccountIdConversationIdPairDto;
import message.app.dtos.conversation.ConversationDto;
import message.app.entities.Conversation;
import message.app.services.ConversationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/conversation")
public class ConversationController {
    private final ConversationService conversationService;
}
