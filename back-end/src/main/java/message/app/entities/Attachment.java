package message.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import message.app.entities.enums.AttachmentType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attachment_id")
    private Long attachmentId;

    @Lob
    @Column(
            name = "attachment_file",
            length = 15 * 1024 * 1024
    )
    private byte[] attachmentFile;

    @Enumerated(EnumType.STRING)
    private AttachmentType attachmentType;
}
