package info5153.case_study.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import info5153.case_study.server.po.PurchaseOrder;
import info5153.case_study.server.po.PurchaseOrderDAO;
import info5153.case_study.server.po.PurchaseOrderLineItem;

@SpringBootTest
class ServerApplicationTests {

	@Autowired
	private PurchaseOrderDAO purchaseOrderDAO;

	@Test
	void contextLoads() {
	}

	@Test
	void createsPurchaseOrderWithLineItems() {
		PurchaseOrderLineItem firstItem = new PurchaseOrderLineItem();
		firstItem.setProductId("P-01");
		firstItem.setQuantity(10);
		PurchaseOrderLineItem secondItem = new PurchaseOrderLineItem();
		secondItem.setProductId("P-02");
		secondItem.setQuantity(5);

		PurchaseOrder purchaseOrder = new PurchaseOrder();
		purchaseOrder.setVendorId(4);
		purchaseOrder.setItems(List.of(firstItem, secondItem));

		PurchaseOrder created = purchaseOrderDAO.create(purchaseOrder);

		assertTrue(created.getID() > 0);
		assertEquals(4, created.getVendorId());
		assertEquals(2, created.getItems().size());
		assertTrue(created.getItems().stream().allMatch(item -> item.getPoId() == created.getID()));
		assertTrue(created.getItems().stream().allMatch(item -> item.getID() > 0));
		assertNotNull(created.getDate());
	}
}
