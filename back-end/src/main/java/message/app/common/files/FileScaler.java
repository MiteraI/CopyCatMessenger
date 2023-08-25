package message.app.common.files;

import java.io.IOException;

public interface FileScaler {
    byte[] scale(byte[] file, String fileExtension) throws IOException;
}
