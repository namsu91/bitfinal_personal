package kr.co.doublecome.chatting.service;

import java.util.List;

import kr.co.doublecome.repository.vo.Chat;
import kr.co.doublecome.repository.vo.ChatSearch;
import kr.co.doublecome.repository.vo.ConverSation;
import kr.co.doublecome.repository.vo.GetCount;

public interface ChattingService  {
	List<Chat> chatList(ChatSearch cList);
	List<ConverSation> selectOneChat(ConverSation covst);
	void chatUpdate(ConverSation covst);
	void chatInsert(ConverSation covst);
	void readsUpdate(Chat chat);
	int readsCount(Chat chat);
	void readsDelete(ConverSation covst);
	GetCount getMsg(String email);
	void messageReadsUpdate(ConverSation covst);
}
