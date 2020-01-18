package kr.co.doublecome.common.service;


import javax.servlet.http.HttpServletResponse;

import kr.co.doublecome.repository.vo.User;
import kr.co.doublecome.repository.vo.UtilFile;

public interface FileService {

	public UtilFile uploadFile(UtilFile uFile);
	public void downLoadFile(int fileNo, HttpServletResponse res);
	public void tempFile(String root, HttpServletResponse res);
	public String saveBase64File(String content);
	public UtilFile uploadProfile(UtilFile util, User user);
	public void deleteProfile(User user);
	public int maxFileGroupCode();
}
