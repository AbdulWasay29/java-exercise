package info5153.exercises.server.expense;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ExpenseCategory {
    @Id
    private String id;
    private String description;
}
