package com.example.thimodule4province.repository;

import com.example.thimodule4province.model.Province;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProvinceRepository extends JpaRepository<Province, Long> {
    Page<Province> findAllByNameContaining(String name, Pageable pageable);
}
