package info5153.exercises.server.report;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ReportController {

    private final ReportDAO reportDAO;

    public ReportController(ReportDAO reportDAO) {
        this.reportDAO = reportDAO;
    }

    @PostMapping("/api/reports")
    public ResponseEntity<Report> addOne(@RequestBody Report report) {
        return new ResponseEntity<>(reportDAO.create(report), HttpStatus.OK);
    }
}
