package kr.co.doublecome.repository.mapper;

import java.util.List;

import kr.co.doublecome.repository.vo.Chat;
import kr.co.doublecome.repository.vo.ChatSearch;
import kr.co.doublecome.repository.vo.ConverSation;
import kr.co.doublecome.repository.vo.GetCount;

public interface ChattingMapper {
	List<Chat> listChat(ChatSearch cList);
	List<ConverSation> oneChat(ConverSation covst);
	void updateChat(ConverSation covst);
	void addCovstData(ConverSation covst);
	int readsCnt(Chat chat);
	void updateReads(Chat chat);
	void deleteReads(ConverSation covst);
	GetCount getMessage(String email);
	void messageReads(ConverSation covst);
}
