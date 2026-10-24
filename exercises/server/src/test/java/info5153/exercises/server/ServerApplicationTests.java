package info5153.exercises.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import info5153.exercises.server.report.Report;
import info5153.exercises.server.report.ReportDAO;
import info5153.exercises.server.report.ReportItem;

@SpringBootTest
class ServerApplicationTests {

	@Autowired
	private ReportDAO reportDAO;

	@Test
	void contextLoads() {
	}

	@Test
	void createsExpenseReportWithItems() {
		ReportItem firstItem = new ReportItem();
		firstItem.setExpenseId(1);
		ReportItem secondItem = new ReportItem();
		secondItem.setExpenseId(2);

		Report report = new Report();
		report.setEmployeeId(6);
		report.setItems(List.of(firstItem, secondItem));

		Report created = reportDAO.create(report);

		assertTrue(created.getID() > 0);
		assertEquals(6, created.getEmployeeId());
		assertEquals(2, created.getItems().size());
		assertTrue(created.getItems().stream().allMatch(item -> item.getReportId() == created.getID()));
		assertTrue(created.getItems().stream().allMatch(item -> item.getID() > 0));
		assertNotNull(created.getDate());
	}
}
