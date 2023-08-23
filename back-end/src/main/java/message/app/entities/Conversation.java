package message.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.entities.enums.ConversationType;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "conversation")
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conversation_id")
    private Long conversationId;

    @Enumerated(EnumType.STRING)
    private ConversationType conversationType;

    @Column(length = 50)
    private String name;

    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "conversation"
    )
    private List<Message> messages;

    @ManyToMany
    @JoinTable(
            name = "conversation_account",
            joinColumns = @JoinColumn(
                    name = "conversation_id",
                    referencedColumnName = "conversation_id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "account_id",
                    referencedColumnName = "account_id"
            )
    )
    private List<Account> accounts;
}
