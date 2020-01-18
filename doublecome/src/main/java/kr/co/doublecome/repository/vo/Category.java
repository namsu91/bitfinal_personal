package kr.co.doublecome.repository.vo;

import lombok.Data;

@Data
public class Category {
	private int categoryCode;				// 카테고리 번호
	private String categoryName;			// 카테고리 이름
	private String categoryIcon;			// 카테고리 아이콘
	private int categoryDisplay;			// 카테고리 노출여부
	private int categoryAuctionCnt;			// 카테고리 경매개수
	private int categoryCnt;			// 카테고리 총개수
	private int categoryOrder;			// 카테고리 순서
}
