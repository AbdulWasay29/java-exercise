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
import info5153.exercises.server.expense.Expense;
import info5153.exercises.server.expense.ExpenseRepository;

@SpringBootTest
class ServerApplicationTests {

	@Autowired
	private ReportDAO reportDAO;

	@Autowired
	private ExpenseRepository expenseRepository;

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

		assertTrue(created.getId() > 0);
		assertEquals(6, created.getEmployeeId());
		assertEquals(2, created.getItems().size());
		assertTrue(created.getItems().stream().allMatch(item -> item.getReportId() == created.getId()));
		assertTrue(created.getItems().stream().allMatch(item -> item.getId() > 0));
		assertNotNull(created.getDate());
	}

	@Test
	void findsExpensesByEmployeeId() {
		List<Expense> employeeExpenses = expenseRepository.findByEmployeeId(1L);

		assertEquals(3, employeeExpenses.size());
		assertTrue(employeeExpenses.stream().allMatch(expense -> expense.getEmployeeId() == 1));
	}

}
