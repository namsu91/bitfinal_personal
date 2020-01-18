package kr.co.doublecome.repository.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UtilFile {

	private int fileNo;
	private int fileGroupCode;
	private String fileOriginName;
	private String fileSystemName;
	private String filePath;
	private String fileThumb;
	private List<MultipartFile> attach;
	
	private int tagNo;
	private int tagXCor;
	private int tagYCor;
	private String tagContent;
}
