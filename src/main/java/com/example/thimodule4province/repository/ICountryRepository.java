package com.example.thimodule4province.repository;

import com.example.thimodule4province.model.Country;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICountryRepository extends JpaRepository<Country, Long> {
    Page<Country> findAllByNameContaining(String name, Pageable pageable);

}
