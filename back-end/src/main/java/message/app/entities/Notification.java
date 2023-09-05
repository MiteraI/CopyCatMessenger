package message.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "notification")
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "notification_id"
    )
    private Long notificationId;

    @ManyToOne(
            optional = false
    )
    @JoinColumn(
            name = "receiver_id",
            referencedColumnName = "account_id"
    )
    private Account account;

    @Column(
            length = 64
    )
    private String header;

    private String content;
}
