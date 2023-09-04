package message.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.entities.enums.MessageType;
import org.hibernate.annotations.Nationalized;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "message")
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "message_id"
    )
    private Long messageId;

    @ManyToOne(
            cascade = CascadeType.MERGE
    )
    @JoinColumn(
            name = "account_id",
            referencedColumnName = "account_id",
            nullable = false
    )
    private Account account;

    @ManyToOne(
        cascade = CascadeType.MERGE
    )
    @JoinColumn(
            name = "conversation_id",
            referencedColumnName = "conversation_id",
            nullable = false
    )
    private Conversation conversation;

    @Column(
            length = 512
    )
    @Nationalized
    private String content;

    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    @OneToOne(
            cascade = CascadeType.MERGE
    )
    @JoinColumn(
            name = "attachment_id",
            referencedColumnName = "attachment_id"
    )
    private Attachment attachment;
}
