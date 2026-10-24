package info5153.exercises.server.expense;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "expenseCategories", path = "expenseCategories")
public interface ExpenseCategoryRepository extends CrudRepository<ExpenseCategory, String> {
}
