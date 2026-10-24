package info5153.exercises.server.expense;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5200"})
@RestController
public class ExpenseController {
    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @GetMapping("/api/expenses")
    public ResponseEntity<Iterable<Expense>> findAll() {
        return new ResponseEntity<>(expenseRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/api/expenses/{id}")
    public ResponseEntity<Expense> findById(@PathVariable long id) {
        return expenseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/api/expenses")
    public ResponseEntity<Expense> updateOne(@RequestBody Expense expense) {
        return new ResponseEntity<>(expenseRepository.save(expense), HttpStatus.OK);
    }

    @PostMapping("/api/expenses")
    public ResponseEntity<Expense> createOne(@RequestBody Expense expense) {
        return new ResponseEntity<>(expenseRepository.save(expense), HttpStatus.OK);
    }

    @DeleteMapping("/api/expenses/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
        return new ResponseEntity<>(expenseRepository.deleteOne(id), HttpStatus.OK);
    }
}
