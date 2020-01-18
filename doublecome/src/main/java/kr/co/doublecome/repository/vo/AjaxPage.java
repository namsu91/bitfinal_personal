package kr.co.doublecome.repository.vo;

import java.util.List;

import kr.co.doublecome.util.page.PageResult;
import lombok.Data;

@Data
public class AjaxPage {
	private List<Object> list;
	private PageResult pr;	
}
