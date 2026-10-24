package info5153.case_study.server.po;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class PurchaseOrderController {

    private final PurchaseOrderDAO purchaseOrderDAO;

    public PurchaseOrderController(PurchaseOrderDAO purchaseOrderDAO) {
        this.purchaseOrderDAO = purchaseOrderDAO;
    }

    @PostMapping("/api/purchase-orders")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder purchaseOrder) {
        return new ResponseEntity<>(purchaseOrderDAO.create(purchaseOrder), HttpStatus.OK);
    }
}
