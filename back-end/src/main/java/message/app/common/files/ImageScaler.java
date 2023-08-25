package message.app.common.files;

import net.coobird.thumbnailator.Thumbnails;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ImageScaler implements FileScaler {
    @Override
    public byte[] scale(byte[] file, String fileExtension) throws IOException {
        byte[] resizedImageData = new byte[0];
        try {
            BufferedImage resizedImage = Thumbnails.of(new ByteArrayInputStream(file))
                    .size(240, 240)
                    .asBufferedImage();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(resizedImage, fileExtension, outputStream);
            resizedImageData = outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
        return resizedImageData;
    }
}
