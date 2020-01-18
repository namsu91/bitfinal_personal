package kr.co.doublecome.common.service;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.co.doublecome.repository.mapper.FileMapper;
import kr.co.doublecome.repository.vo.User;
import kr.co.doublecome.repository.vo.UtilFile;

@Service("kr.co.doublecome.common.service.FileServiceImpl")
public class FileServiceImpl implements FileService{

	@Autowired
	private FileMapper mapper;
	
	public UtilFile uploadFile(UtilFile uFile) {
		SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/");
		String filePath = "/auction" + sdf.format(new Date());
		int groupCode = mapper.maxFileGroupCode() + 1;
		for (MultipartFile mFile : uFile.getAttach()) {
			if (mFile.isEmpty()) continue;
			
			String orgName = mFile.getOriginalFilename();
			String ext = orgName.substring(orgName.lastIndexOf("."));
			String sysName = UUID.randomUUID().toString() + ext;
			File file = new File("/var/photo/upload" + filePath + sysName);
			if(file.exists() == false) file.mkdirs();
			try {
				mFile.transferTo(file);
			} catch (Exception e) {
			}
			uFile.setFileGroupCode(groupCode);
			uFile.setFileOriginName(orgName);
			uFile.setFileSystemName(sysName);
			uFile.setFilePath("/var/photo/upload" + filePath);
			mapper.addFile(uFile);
		}
		return uFile;
	}
	//유저 프로필 사진 삭제 
		public void deleteProfile(User user) {
			if(user.getFileNo() != 1)
			mapper.deleteProfile(user.getFileNo());
			if(user.getFileGroupCode() != 0) {
					
				String path = "/var/photo/upload/user" + "/" + user.getUserEmail() + "/";
				File folder = new File(path);
				try {
				    while(folder.exists()) {
					File[] folder_list = folder.listFiles(); //파일리스트 얻어오기
							
					for (int j = 0; j < folder_list.length; j++) {
						folder_list[j].delete(); //파일 삭제 
						System.out.println("파일이 삭제되었습니다.");
					}
					
					if(folder_list.length == 0 && folder.isDirectory()){ 
						folder.delete(); //대상폴더 삭제
						System.out.println("폴더가 삭제되었습니다.");
					}
			            }
				 } catch (Exception e) {
					e.getStackTrace();
				}
			}
		}
	//유저 프로필 이미지
	public UtilFile uploadProfile(UtilFile uFile, User user ) {
		String filePath = "/user" + "/" + user.getUserEmail() + "/";
		
		int groupCode = user.getFileGroupCode();
		for (MultipartFile mFile : uFile.getAttach()) {
			if (mFile.isEmpty()) continue;
			
			String orgName = mFile.getOriginalFilename();
			String ext = orgName.substring(orgName.lastIndexOf("."));
			String sysName = UUID.randomUUID().toString() + ext;
			File file = new File("/var/photo/upload" + filePath + sysName);
			if(file.exists() == false) file.mkdirs();
			try {
				mFile.transferTo(file);
			} catch (Exception e) {
				
			}
			uFile.setFileNo(user.getFileNo());
			uFile.setFileGroupCode(groupCode);
			uFile.setFileOriginName(orgName);
			uFile.setFileSystemName(sysName);
			uFile.setFilePath("/var/photo/upload" + filePath);
			mapper.addProfile(uFile);
		}
		return uFile;
	}
	
	public int maxFileGroupCode() {
		return mapper.maxFileGroupCode();
	}
	public void deleteProfile(int i) {
		mapper.deleteProfile(i);
	};
	
	public void downLoadFile(int fileNo, HttpServletResponse res) {
		try {
			UtilFile uFile = mapper.selectOneFile(fileNo);
			File f = new File(uFile.getFilePath(), uFile.getFileSystemName());
			String orgName = uFile.getFileOriginName();
			if (orgName == null) {
				res.setHeader("Content-type", "image/jpg");
			} else {
				res.setHeader("Content-type", "application/octet-stream");
				orgName = new String(orgName.getBytes("utf-8"), "8859_1");
				res.setHeader("Content-Disposition", "attachment;filename=" + orgName);
			}
			
		FileInputStream fis = new FileInputStream(f);
		BufferedInputStream bis = new BufferedInputStream(fis);
		OutputStream out = res.getOutputStream();
		BufferedOutputStream bos = new BufferedOutputStream(out);
		while (true) {
			int ch = bis.read();
			if (ch == -1)
				break;
			bos.write(ch);
		}
		bis.close();
		fis.close();
		bos.close();
		out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void tempFile(String root, HttpServletResponse res) {
		try {
			File f = new File(root);
			res.setHeader("Content-type", "image/jpg");
			if(f.exists() == false) f.mkdirs();
			FileInputStream fis = new FileInputStream(f);
			BufferedInputStream bis = new BufferedInputStream(fis);
			OutputStream out = res.getOutputStream();
			BufferedOutputStream bos = new BufferedOutputStream(out);
			while (true) {
				int ch = bis.read();
				if (ch == -1)
					break;
				bos.write(ch);
			}
			bis.close();
			fis.close();
			bos.close();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String saveBase64File(String content) {
		UtilFile util = new UtilFile();
		SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/");
		String filePath = "/history" + sdf.format(new Date());
		int groupCode = mapper.maxFileGroupCode() + 1;
		String orgContent = content;
		System.out.println(content);
		String img = content;
		while(true) {
			int extTempStart = img.indexOf("image/");
			if (extTempStart == -1) return orgContent;
			String extTemp = img.substring(extTempStart + 6);
			String ext = extTemp.substring(0, extTemp.indexOf(";"));
			String temp = img.substring(img.indexOf("base64,") + 7);
			String nameStart = temp.substring(temp.indexOf("data-filename=\"") + 15);
			String orgName = nameStart.substring(0, nameStart.indexOf("\""));
			System.out.println(orgName);
			int end = temp.indexOf("\"");
			System.out.println("img" + img);
			img = temp.substring(end);
			String baseImg = temp.substring(0, end);
			byte[] imageBytes = DatatypeConverter.parseBase64Binary(baseImg);
			
			String sysName = UUID.randomUUID().toString() + "." + ext;
			try {
				File file = new File("/var/photo/upload" + filePath + sysName);
				if(file.exists() == false) file.mkdirs();
				System.out.println(imageBytes);
				BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
				System.out.println(bufImg);
				ImageIO.write(bufImg, ext, file);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			util.setFileGroupCode(groupCode);
			util.setFileOriginName(orgName);
			util.setFileSystemName(sysName);
			util.setFilePath("/var/photo/upload" + filePath);
			mapper.addFile(util);
			int tagStart = orgContent.indexOf("<img src=\"data:");
			if (tagStart == -1) tagStart = orgContent.indexOf("<img style"); 
			System.out.println(tagStart);
			System.out.println(orgContent);
			orgContent = orgContent.replace(orgContent.substring(tagStart, orgContent.indexOf(">", tagStart) + 1), "<br/><img style=\"width: 350px\" src=\"/doublecome/file/downLoadFile.do" + "?fileNo=" + util.getFileNo() + "\"><br/>");
		}
	}
}
