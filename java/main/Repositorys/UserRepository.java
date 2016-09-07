package main.Repositorys;

import main.models.UserManagement.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
	@Query("SELECT u FROM User u WHERE u.username LIKE CONCAT('%',:username,'%') OR u.email LIKE CONCAT('%',:email,'%') OR u.address LIKE CONCAT('%',:address,'%')")
	Page<User> findByUsernameOrEmailOrAddress(@Param("username") String username, @Param("email") String email, @Param("address") String address, Pageable pageable);

	@Query("SELECT u FROM User u")
	List<User> findByMostWon();

	List<User> findByType(@Param("type")int type);
}
