package kr.co.doublecome.repository.vo;

import lombok.Data;

@Data
public class ReportType {
	private int reportTypeCode;				// 신고항목 번호
	private String reportTypeName;			// 신고항목 이름
	private int reportTypeReportCnt;			// 신고항목 경매개수
	private int reportTypeCnt;			// 신고항목 총개수
	private int reportTypeOrder;			// 신고항목 순서
}
