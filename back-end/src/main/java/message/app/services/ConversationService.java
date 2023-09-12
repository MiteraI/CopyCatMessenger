package message.app.services;

import lombok.RequiredArgsConstructor;
import message.app.dtos.conversation.ConversationDto;
import message.app.entities.Conversation;
import message.app.repositories.ConversationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;

}
