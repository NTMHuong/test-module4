package com.example.thimodule4province.service.country;

import com.example.thimodule4province.model.Country;
import com.example.thimodule4province.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICountryService extends IGeneralService<Country> {
    Page<Country> findAllByNameContaining(String name, Pageable pageable);

}
