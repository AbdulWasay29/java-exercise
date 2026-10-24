package info5153.exercises.server.employee;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(
        origins = "http://localhost:4200",
        methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.OPTIONS}
)
@RestController
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/api/employees")
    public ResponseEntity<Iterable<Employee>> findAll() {
        Iterable<Employee> employees = employeeRepository.findAll();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PutMapping("/api/employees")
    public ResponseEntity<Employee> updateOne(@RequestBody Employee employee) {
        Employee updatedEmployee = employeeRepository.save(employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }
}
