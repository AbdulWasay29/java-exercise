package info5153.case_study.server.po;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Component
public class PurchaseOrderDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public PurchaseOrder create(PurchaseOrder purchaseOrder) {
        purchaseOrder.setDate(LocalDateTime.now());
        entityManager.persist(purchaseOrder);

        for (PurchaseOrderLineItem item : purchaseOrder.getItems()) {
            item.setPoId(purchaseOrder.getID());
            entityManager.persist(item);
        }

        entityManager.flush();
        entityManager.refresh(purchaseOrder);
        return purchaseOrder;
    }
}
