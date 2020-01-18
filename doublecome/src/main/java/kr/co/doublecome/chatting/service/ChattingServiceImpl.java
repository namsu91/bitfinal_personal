package kr.co.doublecome.chatting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.ChattingMapper;
import kr.co.doublecome.repository.vo.Chat;
import kr.co.doublecome.repository.vo.ChatSearch;
import kr.co.doublecome.repository.vo.ConverSation;
import kr.co.doublecome.repository.vo.GetCount;

@Service("kr.co.doublecome.chatting.service.ChattingServiceImpl")
public class ChattingServiceImpl implements ChattingService	{
	
	@Autowired
	private ChattingMapper mapper;
	
	public List<Chat> chatList(ChatSearch cList) {
		return mapper.listChat(cList);
	}
	public List<ConverSation> selectOneChat(ConverSation covst) {
		return mapper.oneChat(covst);
	}
	public void chatUpdate(ConverSation covst) {
		mapper.updateChat(covst);
	} 		
	public void chatInsert(ConverSation covst) {
		mapper.addCovstData(covst);
	}
	public int readsCount(Chat chat) {
		return mapper.readsCnt(chat);
	}
	public void readsUpdate(Chat chat) {
		mapper.updateReads(chat);
	}
	public void readsDelete(ConverSation covst) {
		mapper.deleteReads(covst);
	}
	public GetCount getMsg(String email) {
		return mapper.getMessage(email);
	}
	public void messageReadsUpdate(ConverSation covst) {
		mapper.messageReads(covst);
	}
}
