package com.stationary.api.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileUtils {

    private FileUtils() {
    }

    public static void saveFile(Path uploadPath, String fileName, MultipartFile multipartFile) throws IOException {

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }

    public static void deleteFile(Path filePath, String fileName) throws IOException {
        Files.delete(filePath.resolve(fileName));
    }

}
