package info5153.case_study.server.vendor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin 
@RepositoryRestResource(collectionResourceRel = "vendors", path = "vendors")
public interface VendorRepository extends CrudRepository<Vendor, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Vendor vendor WHERE vendor.id = ?1")
    int deleteOne(Long id);
}