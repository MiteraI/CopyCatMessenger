package message.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.entities.enums.StatusType;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "fr_id"
    )
    private Long friendRequestId;

    @ManyToOne(
            optional = false
    )
    @JoinColumn(
            name = "sender_id",
            referencedColumnName = "account_id"
    )
    private Account sender;

    @OneToOne(
            optional = false
    )
    @JoinColumn(
            name = "receiver_id",
            referencedColumnName = "account_id"
    )
    private Account receiver;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime sendTime;

    private String message;
}
