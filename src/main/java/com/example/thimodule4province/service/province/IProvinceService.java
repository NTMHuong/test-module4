package com.example.thimodule4province.service.province;

import com.example.thimodule4province.model.Province;
import com.example.thimodule4province.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProvinceService extends IGeneralService<Province> {
    Page<Province> findAllByNameContaining(String name, Pageable pageable);
}
